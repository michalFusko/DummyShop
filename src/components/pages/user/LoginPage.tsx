import { useEffect, useState } from "react";
import { useLoginMutation } from "../../../hooks/user/useLoginMutation";
import { useUserStore } from "../../../store/useUserStore";
import { Link, useNavigate } from "react-router";
import { RiAiGenerate } from "react-icons/ri";
import { useGetAllUsersQuery } from "../../../hooks/user/useGetAllUsersQuery";
import { useTransferCartStore } from "../../../store/useTransferCartStore";
import { useCartStore } from "../../../store/useCartStore";
import { useCheckUsernameQuery } from "../../../hooks/user/useCheckUsernameQuery";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const [userNameToCheck, setUserNameToCheck] = useState<string | undefined>(
    "",
  ); // to check if user exists and conditional render
  const { data: userExists } = useCheckUsernameQuery(userNameToCheck);

  const { mutate: login, error, isPending } = useLoginMutation();
  const { data: allUsers } = useGetAllUsersQuery(); // for generating user login data
  const setUser = useUserStore((state) => state.setUser); //login handling
  const { keepItems, setKeepItems, setTransferItems } = useTransferCartStore(); //for handling cart items after login
  const selectedProducts = useCartStore((state) => state.selectedProducts); // only for conditional rendering

  //autofill username and password
  const handleGenerateUser = () => {
    if (allUsers) {
      const user = allUsers[Math.floor(Math.random() * allUsers.length)];
      setUserName(user.username);
      setPassword(user.password);
    }
    return;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !password) return;
    //try login, sucess/error handle
    login(
      { username: userName, password },
      {
        onSuccess: (data) => {
          setUser({
            id: data.id,
            username: data.username,
            email: data.email,
            image: data.image,
            firstName: data.firstName,
            lastName: data.lastName,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
          navigate("/profile"); // redirect
        },
        onError: (err) => {
          console.error("Login error:", err);
        },
      },
    );
    //check if username exists and clear form
    setUserNameToCheck(userName);
    setUserName("");
    setPassword("");
  };

  //set default cart behavior on login
  useEffect(() => {
    setKeepItems(true); //keep guest
    setTransferItems(false); //dont transfer stored users cart
  }, [setKeepItems, setTransferItems]);

  return (
    <section
      aria-label="Login page"
      className="relative flex h-[93vh] flex-col items-center justify-center bg-white text-black md:mt-[7vh]"
    >
      {/* GET USER BTN */}
      <aside>
        <button
          className="absolute top-20 right-5 flex w-[10vw] cursor-pointer items-center justify-center gap-2 border-b md:top-10 md:right-20"
          onClick={handleGenerateUser}
        >
          <p className="">GENERATE USER</p>
          <RiAiGenerate size={18} />
        </button>
      </aside>
      {/* FORM */}
      <header>
        <h1 className="mb-[5vh] text-3xl font-semibold md:mb-[10vh] md:text-5xl">
          LOGIN
        </h1>
      </header>

      <form
        className="mx-auto flex w-[90%] flex-col items-center justify-center gap-10 md:w-[70%] lg:w-[50%] 2xl:w-[35%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="USERNAME"
          className="w-full border-b text-lg outline-none md:text-xl"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="w-full border-b text-lg outline-none md:text-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="h-0 text-center text-sm">
          {/* INCORRECT NAME/PASSOWRD */}
          {error && !userExists && (
            <p className="text-red-500">User not found.</p>
          )}

          {error && userExists && (
            <p className="text-red-500">Invalid password.</p>
          )}
        </div>
        {/* CART ITEMS OPTIONS */}
        <div>
          {selectedProducts.length > 0 && (
            <label className="mb-2 flex cursor-pointer justify-between gap-2 text-[10px] md:text-xs">
              <p>Keep my items in my shopping bag after I log in.</p>
              <input
                type="checkbox"
                checked={keepItems}
                onChange={(e) => setKeepItems(e.target.checked)}
              />
            </label>
          )}
          <label className="flex cursor-pointer justify-between gap-2 text-[10px] md:text-xs">
            <p>Add items i left in my account’s shopping bag after I log in.</p>
            <input
              type="checkbox"
              onChange={(e) => setTransferItems(e.target.checked)}
            />
          </label>
        </div>
        {/* BUTTONS */}
        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-black p-4 text-sm text-white md:text-xl"
        >
          {isPending ? "LOGGING IN..." : "SIGN IN"}
        </button>
        <Link to={"/register"} className="cursor-pointer text-sm md:text-base">
          CREATE ACCOUNT
        </Link>
      </form>
    </section>
  );
};

export default LoginPage;
