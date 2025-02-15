import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma-client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ useremail: string }> }
) {
  try {
    const { useremail } = await params;

    if (!useremail) {
      return NextResponse.json({ message: "Email пользователя отстуствует" }, { status: 400 });
    }

    const user = await prisma?.user.findUnique({
      where: { userEmail: useremail },
    });

    if (!user) {
      return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error in linking or Bookmarking", error);
    return NextResponse.json(
      { message: "Error in linking or Bookmarking" },
      { status: 500 }
    );
  }
}
