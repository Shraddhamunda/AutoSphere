import prisma from "../config/prisma.js";

export const createTestDrive = async (req, res) => {
  try {
    const { carId, date, time, showroom } = req.body;

    if (!carId || !date || !time || !showroom) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const bookingDate = new Date(`${date}T00:00:00.000Z`);

    if (Number.isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking date",
      });
    }

    const userId = req.user.userId;

    const booking = await prisma.testDrive.create({
      data: {
        userId,
        carId: String(carId),
        date: bookingDate,
        time,
        showroom,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Test drive booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Test drive booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to book test drive",
    });
  }
};

export const getMyTestDrives = async (req, res) => {
  try {
    const bookings = await prisma.testDrive.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

export const getAllTestDrives = async (req, res) => {
  try {
    const bookings = await prisma.testDrive.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all bookings",
    });
  }
};