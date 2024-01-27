const LoggedInFooter = () => {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <footer className="bg-white mt-20">
      <div
        className="mx-auto flex flex-grow flex-wrap max-w-screen-2xl items-center justify-center p-6 lg:px-8 lg:gap-0 gap-y-20"
        aria-label="Global"
      >
        <p className="text-base text-center">
          &#169; Wokr International Ltd, {year}
        </p>
      </div>
    </footer>
  );
};

export default LoggedInFooter;
