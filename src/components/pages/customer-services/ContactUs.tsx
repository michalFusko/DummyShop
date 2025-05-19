const ContactUs = () => {
  return (
    <main className="flex h-[50vh] items-center justify-center">
      <form className="flex h-full w-[50vw] flex-col items-center gap-[5vh]">
        <h1 className="text-center text-3xl font-semibold">CONTACT US</h1>
        <div className="flex w-full gap-[1vw]">
          <input
            type="text"
            className="w-1/2 border-b text-sm outline-none"
            placeholder="NAME"
          />
          <input
            type="tel"
            className="w-1/2 border-b text-sm outline-none"
            placeholder="PHONE NUMBER"
          />
        </div>
        <input
          type="email"
          className="w-full border-b text-sm outline-none"
          placeholder="EMAIL"
        />
        <textarea
          className="w-full border-b text-sm outline-none"
          placeholder="COMMENT"
          rows={3}
        ></textarea>
        <button className="w-1/2 cursor-pointer rounded-md bg-black p-4 text-white">
          SEND
        </button>
      </form>
    </main>
  );
};

export default ContactUs;
