import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function POST(req: NextRequest) {
  try {

    const { useremail, pokemon, action } = await req.json();

    if (!useremail || !pokemon || !action) {
      return NextResponse.json({ message: "You are not logged in" }, { status: 403 });
    }

    if (!["like", "bookmark"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { userEmail: useremail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          userEmail: useremail,
          bookmarks: [],
          liked: [],
        },
      });
    }

    const fieldToUpdate = action === "bookmark" ? "bookmarks" : "liked";
    const currentItems = user[fieldToUpdate];

    let updateditems;
    let addMessage;

    if (currentItems.includes(pokemon)) {
      updateditems = currentItems.filter((item: any) => item !== pokemon);
      addMessage = "removed";
    } else {
      updateditems = [...currentItems, pokemon];
      addMessage = "added";
    }

    await prisma.user.update({
      where: { userEmail: useremail },
      data: {
        [fieldToUpdate]: updateditems,
      },
    });

    return NextResponse.json({
      toggledOff: currentItems.includes(pokemon),
      success: true,
      message: `Successfully ${addMessage} ${pokemon}`,
    });
  } catch (error) {
    console.log("Error in linking or Bookmarking", error);

    return NextResponse.json(
      { message: "An error coccured while processing your request" },
      { status: 500 }
    );
  }
}
