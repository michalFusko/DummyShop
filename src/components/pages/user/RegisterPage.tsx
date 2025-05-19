import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useAddUserMutation } from "../../../hooks/user/useAddUserMutation";
import { NewUser } from "../../../types/user";

const RegisterPage = () => {
  // state
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const { mutate: register, isPending } = useAddUserMutation();

  const navigate = useNavigate();
  //check conditions for inputs
  const isUserNameValid = userName.length >= 5;
  const hasNumber = /\d/.test(password);
  const hasCharacters = (value: string) => {
    if (value.length >= 1) return true;
  };
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  const isPasswordValid = password.length >= 8;
  const isPasswordMatching = password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true); //fires conditional renders
    if (
      isUserNameValid &&
      isEmailValid &&
      isPasswordValid &&
      hasNumber &&
      isPasswordMatching &&
      hasCharacters(firstName) &&
      hasCharacters(lastName)
    ) {
      const newUser: NewUser = {
        userName,
        firstName,
        lastName,
        age: 25,
        email,
        password,
        confirmPassword,
      };
      register(newUser, {
        //mocking registration and redirect to login
        onSuccess: () => {
          navigate("/login");
        },
      });
    }
  };
  return (
    <section
      aria-label="Register page"
      className="relative flex h-[93vh] flex-col items-center justify-center bg-white text-black md:mt-[7vh]"
    >
      {/* TOP RIGHT NAVIGATION */}
      <aside>
        <Link
          to={"/login"}
          className="absolute top-[12vh] right-5 flex cursor-pointer items-center justify-center gap-2 border-l md:top-10 md:right-20 md:border-none"
        >
          <FaArrowRight />
          <p>LOG IN</p>
        </Link>
      </aside>
      <header>
        <h1 className="w-full text-left text-2xl font-semibold sm:text-center sm:text-4xl xl:text-5xl">
          CREATE ACCOUNT
        </h1>
        {/* DISCLAIMER */}
        <p className="mb-[5vh] text-left text-[10px] font-light text-red-500 sm:text-center md:text-xs">
          The API doesn’t support real account registration, but you can still
          fill out the form — it’s simulated!
          <br /> To log in, use the "Generate User" button on the login page.
        </p>
      </header>
      <form
        className="mx-auto flex w-[90%] flex-col justify-center text-sm md:w-[70%] md:text-xl lg:w-[50%] 2xl:w-[35%]"
        onSubmit={handleSubmit}
      >
        {/* USERNAME INPUT */}
        <input
          type="text"
          placeholder="USERNAME"
          className="w-full border-b outline-none"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="h-8 md:h-10">
          {isFormSubmitted && !isUserNameValid && (
            <p className="text-xs text-red-500">
              Username must be at least 5 characters long
            </p>
          )}
        </div>
        {/* FIRST NAME INPUT */}
        <input
          type="text"
          placeholder="FIRST NAME"
          className="w-full border-b outline-none"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <div className="h-8 md:h-10">
          {isFormSubmitted && !hasCharacters(firstName) && (
            <p className="text-xs text-red-500">Please enter your name</p>
          )}
        </div>
        {/* LAST NAME INPUT */}
        <input
          type="text"
          placeholder="LAST NAME"
          className="w-full border-b outline-none"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div className="h-8 md:h-10">
          {isFormSubmitted && !hasCharacters(lastName) && (
            <p className="text-xs text-red-500">Please enter your last name</p>
          )}
        </div>
        {/* EMAIL INPUT */}
        <input
          type="text"
          placeholder="EMAIL"
          className="w-full border-b outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="h-8 md:h-10">
          {isFormSubmitted && !isEmailValid && (
            <p className="text-xs text-red-500">Please enter a valid email</p>
          )}
        </div>
        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="PASSWORD"
          className="w-full border-b outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="h-8 md:h-10">
          {isFormSubmitted && !isPasswordValid && (
            <p className="text-xs text-red-500">
              Password must be at least 8 characters
            </p>
          )}
          {isFormSubmitted && isPasswordValid && !hasNumber && (
            <p className="text-xs text-red-500">
              Password must contain at least one number
            </p>
          )}
        </div>
        {/* CONFIRM PASSWORD INPUT */}
        <input
          type="password"
          placeholder="CONFIRM PASSWORD"
          className="w-full border-b outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="h-10">
          {isFormSubmitted && !isPasswordMatching && (
            <p className="text-xs text-red-500">Passwords must match</p>
          )}
        </div>
        {/* BUTTON */}
        <button className="w-full cursor-pointer rounded-xl bg-black p-4 text-white">
          {isPending ? "CREATING ACCOUNT" : "CREATE"}
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
