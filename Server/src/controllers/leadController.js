import prisma from "../config/prisma.js";

const validStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

// Public: submit a lead from the website
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const lead = await prisma.lead.create({
      data: { name, email, phone, message },
    });

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead,
    });
  } catch (error) {
    console.error("Create lead error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create lead",
    });
  }
};

// Admin and Sales Consultant: view leads
export const getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Get leads error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch leads",
    });
  }
};

// Admin and Sales Consultant: update status or assignment
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedToId } = req.body;

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead status",
      });
    }

    if (assignedToId) {
      const consultant = await prisma.user.findUnique({
        where: { id: assignedToId },
      });

      if (!consultant || !["SALES_CONSULTANT", "ADMIN"].includes(consultant.role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid sales consultant",
        });
      }
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(assignedToId !== undefined && { assignedToId: assignedToId || null }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error("Update lead error:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Unable to update lead",
    });
  }
};