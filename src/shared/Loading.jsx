import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="font-thin flex items-center justify-center lg:h-[700px] md:h-[500px] h-96 w-full ">
        <p className="flex gap-2 items-center text-5xl font-semibold">
          L<span class="loading loading-spinner loading-lg"></span>
          ading
          <span className="mt-10 loading loading-dots loading-lg"></span>
        </p>
      </div>
    </div>
  );
};

export default Loading;
