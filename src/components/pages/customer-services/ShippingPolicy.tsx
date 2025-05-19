const ShippingPolicy = () => {
  return (
    <section className="flex flex-col gap-10">
      <header>
        <h1 className="text-center text-4xl">SHIPPING POLICY</h1>
      </header>
      <main>
        <p>
          SHIPPING AVAILABILITY, TIMES, AND COSTS MAY VARY DEPENDING ON THE
          PRODUCT AND DESTINATION.
        </p>
        <p>
          ESTIMATED DELIVERY TIMES WILL BE PROVIDED AT CHECKOUT, BUT PLEASE NOTE
          THAT DELAYS MAY OCCUR DUE TO CARRIER ISSUES OR OTHER FACTORS BEYOND
          OUR CONTROL.
        </p>
        <p>
          WE CURRENTLY SHIP TO SELECT REGIONS ONLY. PLEASE REFER TO THE PRODUCT
          OR CHECKOUT PAGE FOR SPECIFIC SHIPPING OPTIONS FOR YOUR LOCATION.
        </p>
        <p>
          IF YOU HAVE ANY QUESTIONS ABOUT SHIPPING OR NEED TO TRACK YOUR ORDER,
          CONTACT US AT [YOUR-EMAIL@EXAMPLE.COM].
        </p>
      </main>
    </section>
  );
};

export default ShippingPolicy;
