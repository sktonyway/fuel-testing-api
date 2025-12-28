const select = document.getElementById("vehicleSelect");
const output = document.getElementById("output");


async function loadVehicles() {
    try {
        const allVehicles = await fetch("http://localhost:5000/api/vehicles");
        const data = await allVehicles.json();

        data.forEach(erv => {
            const option = document.createElement("option");
            option.value = erv;
            option.textContent = erv;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Unable to load vehicles:", error);
    }
}
loadVehicles();

select.addEventListener("change", async () => {
    const erv = select.value;
    output.innerHTML = "Loading...";

    if (!erv) {
        output.innerHTML = "Please select a vehicle";
        return;
    }
    const res = await fetch(`http://localhost:5000/api/txn/${erv}`);

    const data = await res.json();
    if (!data.length) {
        output.innerHTML = "No transactions found";
        return;
    }

    output.innerHTML = `
  <table id="txnTable" border="1" cellspacing="0" cellpadding="8">
    <thead>
      <tr>
        <th>Date</th>
        <th>Vehicle</th>
        <th> Prev Odo</th>
        <th> Curr Odo</th>
        <th> TotalKm</th>
        <th>KMPL</th>
        <th>Vol (L)</th>
        <th>Rate (₹)</th>
        <th>Amount (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${data.map(txn => `
        <tr>
          <td>${new Date(txn.date).toLocaleDateString()}</td>
          <td>${txn.erv}</td>
          <td>${txn.prevOdo}</td>
          <td>${txn.currOdo}</td>
          <td>${txn.totalKm}</td>
          <td>${txn.kmpl}</td>
          <td>${txn.vol}</td>
          <td>${txn.rate}</td>
          <td>${txn.amt}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>
`;

});



