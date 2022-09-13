const editCompanyBtn = document.querySelectorAll(".edit-company");

Array.from(editCompanyBtn).forEach((el) => {
  el.addEventListener("click", editCompany);
});

// Location Tool
async function locate() {
  const nodeId = this.dataset.id;
  console.log(nodeId);

  console.log("This: ", this);
}

// @route   PUT /companies/:id
const form = document.querySelector("#form-edit-company");

async function editCompany() {
  // the _id from the button
  const companyId = this.dataset.id;
  console.log("Company ID: ", companyId);

  // Select the Data from form
  let data = new FormData(form);

  let companyName = data.get("companyName");
  let dateAdded = data.get("dateAdded");
  let url = data.get("url");
  let role = data.get("role");
  let roleURL = data.get("roleURL");
  let position = data.get("position");
  let source = data.get("source");
  let pocName = data.get("pocName");
  let pocPosition = data.get("pocPosition");
  let pocEmail = data.get("pocEmail");
  let applied = data.get("applied");
  let applyDate = data.get("applyDate");
  let coffeeChat = data.get("coffeeChat");
  let coffeeChatDate = data.get("coffeeChatDate");
  let saidThanks = data.get("saidThanks");
  let interviewDate = data.get("interviewDate");
  let followUpDate = data.get("followUpDate");
  let comments = data.get("comments");

  let obj = {
    companyId,
    companyName,
    dateAdded,
    url,
    role,
    roleURL,
    position,
    source,
    pointOfContact: {
      name: pocName,
      position: pocPosition,
      email: pocEmail,
    },
    application: {
      applied,
      applyDate,
      coffeeChat,
      coffeeChatDate,
      saidThanks,
      interviewDate,
      followUpDate,
    },
    comments,
  };

  console.log(obj);

  try {
    const response = await fetch(`/companies/${companyId}`, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
