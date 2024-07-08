export default function Button({ text, event, className, type = "button" }) {
  return (
    <>
      <button type={type} onClick={event} className={className}>
        {text}
      </button>

      <style jsx>{`
        button {
          font-family: "NanumSquareExtraBold";
          padding: 10px 30px;
          background-color: transparent;
          outline: none;
          border: 1px solid #525ffb;
          font-size: 20px;
          letter-spacing: 0.05em;
          line-height: 27px;
          color: #525ffb;
          border-radius: 40px;
          cursor: pointer;
          margin: 17px 5px;
        }
        .logout {
          background-color: #c7d6e0;
        }
        .dark {
          background: #525ffb;
          color: #fff;
        }
      `}</style>
    </>
  );
}
