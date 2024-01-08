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
    const appId = 1464188188;
    const serverSecret = "aa6cf07b7e98d46e0a85ca8a9237c179";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      id,
      generateRandomCode().toString(),
      "set Your Name"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: "http://localhost:5173/classRoom/room234",
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showScreenSharingButton: true,
    });
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div ref={myMeeting} />{" "}
    </div>
  );
};

export default RoomSection;
