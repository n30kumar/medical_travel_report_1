const data = {
  workerName: "",
  claimNumber: "",
  appID: "",
  submissionDate: "",
  prescriptionDrugs: [{}],
  otcDrugs: [{}],
  medicalSupplies: [{}],
  parking: [{}],
  mileage: [{}],
  transport: [{}]
};

function input(name, value = "", placeholder = "", type = "text") {
  return `<input name="${name}" type="${type}" value="${value}" placeholder="${placeholder}" style="width: 100%;"/>`;
}

function generateEditableTable(section, headers, fields) {
  const rows = data[section];
  let headerHTML = headers.map(h => `<th>${h}</th>`).join("");
  let rowsHTML = rows
    .map(
      (_, i) =>
        `<tr>` +
        fields
          .map(
            (f) =>
              `<td>${input(`${section}_${i}_${f}`)}</td>`
          )
          .join("") +
        `</tr>`
    )
    .join("");
  return `<table><thead><tr>${headerHTML}</tr></thead><tbody>${rowsHTML}</tbody></table>`;
}

function renderForm(data) {
  const container = document.getElementById("form-container");
  let html = `
    <div class="page">
      <div class="header">
        <div class="logo-section">
          <img src="aaa.png">
          <h1>Workers Compensation Board of Manitoba</h1>
          <p text-align: center>333 Broadway, Winnipeg MB R3C 4W3<br/>
          Toll Free: 1-855-954-4321<br/>wcb.mb.ca</p>
        </div>
        <div class="header-info">
          <h2>Medical & Travel Expense Request</h2>
          <div class="claim-box"><strong>Claim No. 20042047</strong></div>
        </div>
      </div>
      <p><strong>Madeleine willson requested reimbursement for the following medical and/or travel expenses:</p>
      <h3>Prescription Drugs</h3>
      ${generateEditableTable("prescriptionDrugs", ["Drug Name", "Prescription Date", "Date Purchased", "Healthcare Provider Name", "Paid Amount"], ["name", "prescriptionDate", "purchaseDate", "provider", "amount"])}

      <h3>Over-the-Counter Drugs</h3>
      ${generateEditableTable("otcDrugs", ["Drug Name", "Date Purchased", "Paid Amount", "Seller's Name", "Reason for Purchasing"], ["name", "date", "amount", "seller", "reason"])}

      <h3>Bandages, Braces or Other Medical Supplies</h3>
      ${generateEditableTable("medicalSupplies", ["Item Purchased", "Date Purchased", " was this Prescribed?", "Healthcare Provider Name", "Paid Amount", "Seller's Name"], ["item", "date", "prescribed", "provider", "amount", "seller"])}

      <h3>Parking for Medical Appointments</h3>
      ${generateEditableTable("parking", ["Address of Healthcare", "Date", "Paid Amount", "Meter Used?", "Meter Number"], ["address", "date", "amount", "meterUsed", "meterNum"])}

      <h3>Mileage to Medical Appointments</h3>
      <p>The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.</p>
      ${generateEditableTable("mileage", ["Appointment Date", " Address of Healthcare Provider/Medical Facility", "Workplace", "KM (Round Trip)"], ["date", "facility", "workplace", "km"])}

      <div class="footer">
        <span>Worker App ID: ${input("appID")}</span>
        <span>Submitted: ${input("submissionDate", "", "MM/DD/YYYY")}</span>
        <span>Page 1 of 2</span>
      </div>
    </div>

    <div class="page">
      <h3>Bus or Taxi Fare for Medical Appointments</h3>
      <p><em>*Note: Pre-approval is required from your WCB representative to claim taxi fare(s).</em></p>
      ${generateEditableTable("transport", [" appointment Date", "Address of Starting Point", "Address of Healthcare Provider/Medical Facility", "Bus or Taxi(indicate one)", "Total Fare paid"], ["date", "start", "facility", "mode", "fare"])}

  `;
  if (data.transport.length > 0) {
    html += `<p>Was the taxi fare pre-approved by your WCB representative? ${input("transport_approved", "Yes", "Yes/No")}</p>`;
  }
  html += `
      <div class="footer">
        <span>Worker App ID: ${input("appID")}</span>
        <span>Submitted: ${input("submissionDate", "", "MM/DD/YYYY")}</span>
        <span>Page 2 of 2</span>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}


renderForm(data);