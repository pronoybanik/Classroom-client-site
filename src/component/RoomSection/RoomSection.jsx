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
    // const appId = 1464188188;
    // const appId = 1134648179;
    // const appId = 1907519381;
    const appId = 1337293372;
    // const serverSecret = "aa6cf07b7e98d46e0a85ca8a9237c179";
    // const serverSecret = "518430d9c74b17071292ecef41ade196";
    // const serverSecret = "a707ebd5abca831d6fb718d162c293f4";
    const serverSecret = "9cfe819bc048b342321937040466bff0";

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
