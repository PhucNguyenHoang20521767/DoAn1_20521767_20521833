import React from "react";

const FeedbackRespone = ({ feedbackRespone }: any) => {
  return (
    <div>
      {feedbackRespone && (
        <section className="my-2 ml-10 bg-secondary-5">
          <section className="ml-4">
            <div className="text-lg font-medium">Phản hồi từ cửa hàng</div>
            <div className="text-lg text-black">{feedbackRespone}</div>
          </section>
        </section>
      )}
    </div>
  );
};

export default FeedbackRespone;
