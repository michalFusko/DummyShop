import { useNavigate } from "react-router";
import { useUserStore } from "../../../store/useUserStore";
import { useState } from "react";
import { useCartStore } from "../../../store/useCartStore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [keepCart, setKeepCart] = useState<boolean>(true); //handling cart items after logout

  //global state
  const { user, logout } = useUserStore();
  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = () => {
    if (!keepCart) {
      clearCart();
    }
    logout();
    navigate("/login");
  };

  return (
    <section
      aria-label="Profile page"
      className="flex h-[93vh] flex-col items-center bg-white text-black md:mt-[7vh]"
    >
      {/* USER DATA */}
      <header className="mt-[10vh] flex flex-col items-center">
        <img src={user?.image} alt="Profile picture" />
        <p className="text-4xl font-semibold">{user?.username.toUpperCase()}</p>
      </header>
      <main className="mt-[2vh] flex w-full flex-col gap-5 pl-2 text-base sm:pl-5 md:w-2/3 md:pl-0 lg:mt-[5vh] lg:w-1/2 lg:text-2xl 2xl:mt-[10vh]">
        <div className="flex w-full flex-col-reverse justify-between md:flex-row">
          <p>{user?.email}</p>
          <p className="text-xl">EMAIL</p>
        </div>
        <div className="flex w-full flex-col-reverse justify-between md:flex-row">
          <p>{user?.firstName}</p>
          <p className="text-xl">FIRST NAME</p>
        </div>
        <div className="flex w-full flex-col-reverse justify-between md:flex-row">
          <p>{user?.lastName}</p>
          <p className="text-xl">LAST NAME</p>
        </div>
      </main>
      {/* CHECKBOX & BTN */}
      <label className="mt-5 flex gap-2">
        <p>Keep items in my cart after log out?</p>
        <input
          type="checkbox"
          checked={keepCart}
          onChange={(e) => setKeepCart(e.target.checked)}
        />
      </label>
      <button
        className="mt-5 cursor-pointer rounded-lg bg-black p-2 px-10 text-white"
        onClick={handleLogout}
      >
        LOG OUT
      </button>
    </section>
  );
};

export default ProfilePage;
