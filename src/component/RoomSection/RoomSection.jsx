import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React from "react";
import { useParams } from "react-router-dom";

const RoomSection = () => {
  const { id } = useParams();

  // create a reandom 6 degit number
  const generateRandomCode = () => {
    const value = Math.floor(100000 + Math.random() * 900000);
    return value;
  };

  const myMeeting = async (element) => {
    const appId = 576961043;

    const serverSecret = "c5b21bf9545d7553c7130e3444424e98";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      id,
      generateRandomCode().toString(),
      "Set Your Name"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://class-room-project.web.app/classRoom/${id}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showScreenSharingButton: true,
    });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div ref={myMeeting} />{" "}
    </div>
  );
};

export default RoomSection;
