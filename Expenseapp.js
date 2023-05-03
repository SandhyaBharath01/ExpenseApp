function saveExpense(){
  const ExpenseAmount = document.getElementById('ExpenseAmount');
  const ExpenseDescription = document.getElementById('ExpenseDescription');
  const ExpenseCategory = document.getElementById('ExpenseCategory');
  const ExpenseDate = document.getElementById('ExpenseDate');
  const ExpenseNotes = document.getElementById('ExpenseNotes');

  if (!ExpenseAmount || !ExpenseDescription || !ExpenseCategory || !ExpenseDate || !ExpenseNotes) {
    console.error('One or more input elements not found!');
    return;
  }

  const data = {
    ExpenseAmount: ExpenseAmount.value,
    ExpenseDescription: ExpenseDescription.value,
    ExpenseCategory: ExpenseCategory.value,
    ExpenseDate: ExpenseDate.value,
    ExpenseNotes: ExpenseNotes.value
  };

  axios.post("http://localhost:3000/api/expense",{...data}).then((res)=>{
      console.log("res",res);
      let ul = document.getElementById('ExpenseListId');
      let li = document.createElement('li');
      li.innerHTML = `<span>${res.data.ExpenseAmount} </span>&nbsp;&nbsp;<span>${res.data.ExpenseDescription} </span>&nbsp;&nbsp;<span> ${res.data.ExpenseCategory}</span>&nbsp;&nbsp;<span>${res.data.ExpenseDate} </span>&nbsp;&nbsp;<span>${res.data.ExpenseNotes} </span>&nbsp;&nbsp; <button onclick="editExpense(${res.data.id})">Edit</button> &nbsp;&nbsp;<button onclick="deleteExpense(${res.data.id})">Delete</button>`;
      li.setAttribute("id", res.data.id);
      ul.appendChild(li);
      ExpenseAmount.value = "";
      ExpenseDescription.value = "";
      ExpenseCategory.value = "";
      ExpenseDate.value = "";
      ExpenseNotes.value = "";
  })
}


function getExpenses() {
    axios.get("http://localhost:3000/api/expense").then((res) => {
      // console.log("res",res);
      renderExpenseList(res.data);
    });
  }
  function getExpense(id) {
    return axios.get(`http://localhost:3000/api/expense/${id}`);
  }
  function renderExpenseList(data) {
    let ul = document.getElementById("expenseListID");
    data.forEach((item) => {
      let li = document.createElement("li");
      li.innerHTML = `<span>${item.ExpenseAmount} </span>&nbsp;&nbsp;<span>${item.ExpenseDescription} </span>&nbsp;&nbsp;<span> ${item.ExpenseCategory}</span>&nbsp;&nbsp;<span>${item.ExpenseDate} </span>&nbsp;&nbsp;<span>${item.ExpenseNotes} </span>&nbsp;&nbsp; <button onclick="editExpense(${item.id})">Edit</button> &nbsp;&nbsp;<button onclick="deleteExpense(${item.id})">Delete</button>`;
      li.setAttribute("id", item.id);
      ul.appendChild(li);
    });
  }
  function editExpense(id) {
    getExpense(id).then((res) => {
      if (res && res.data) {
        const ExpenseAmount = document.getElementById("ExpenseAmount");
        const ExpenseDescription = document.getElementById("ExpenseDescription");
        const ExpenseCategory = document.getElementById("ExpenseCategory");
        const ExpenseDate = document.getElementById("ExpenseDate");
        const ExpenseNotes = document.getElementById("ExpenseNotes");
  
        if (ExpenseAmount) {
          ExpenseAmount.value = res.data.ExpenseAmount;
        }
        if (ExpenseDescription) {
          ExpenseDescription.value = res.data.ExpenseDescription;
        }
        if (ExpenseCategory) {
          ExpenseCategory.value = res.data.ExpenseCategory;
        }
        if (ExpenseDate) {
          ExpenseDate.value = res.data.ExpenseDate;
        }
        if (ExpenseNotes) {
          ExpenseNotes.value = res.data.ExpenseNotes;
        }
  
        const button = document.getElementById("button");
        if (button) {
          button.value = "Update";
          button.setAttribute("onClick", `updateExpense(${id})`);
        }
      }
    });
  }
  
  function updateExpense(id) {
    const data = {
      ExpenseAmount: document.getElementById("ExpenseAmount").value,
      ExpenseDescription: document.getElementById("ExpenseDescription").value,
      ExpenseCategory: document.getElementById("ExpenseCategory").value,
      ExpenseDate: document.getElementById("ExpenseDate").value,
      ExpenseNotes: document.getElementById("ExpenseNotes").value,
    };
    
    axios.put(`http://localhost:3000/api/expense/${id}`, { ...data }).then((res) => {
      if (res && res.data) {
        let li = document.getElementById(`${id}`);
        li.innerHTML = `<span>${res.data.ExpenseAmount} </span>&nbsp;&nbsp;<span>${res.data.ExpenseDescription} </span>&nbsp;&nbsp;<span> ${res.data.ExpenseCategory}</span>&nbsp;&nbsp;<span>${res.data.ExpenseDate} </span>&nbsp;&nbsp;<span>${res.data.ExpenseNotes} </span>&nbsp;&nbsp; <button onclick="editExpense(${res.data.id})">Edit</button> &nbsp;&nbsp;<button onclick="deleteExpense(${res.data.id})">Delete</button>`;
        // clear the form fields
        document.getElementById("ExpenseAmount").value = "";
        document.getElementById("ExpenseDescription").value = "";
        document.getElementById("ExpenseCategory").value = "";
        document.getElementById("ExpenseDate").value = "";
        document.getElementById("ExpenseNotes").value = "";
      }
    });
  }
    
  
  function deleteExpense(id) {
    axios.delete('http://localhost:3000/api/expense/'+ id).then((res) => {
      document.getElementById(id).remove();
    });
  }