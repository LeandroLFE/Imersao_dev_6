const headers = [
  {
    name: "Nome",
    defaultName: "Nome",
    id: 0,
    value: "Player",
    editableName: true,
    editableValue: false,
    round: false,
    ruleAdd: 0,
    defaultRuleAdd: 0,
    resultField: false,
    nameField: true,
  },
  {
    name: "Duelos JxJ",
    defaultName: "Rodada",
    id: 1,
    value: 0,
    editableName: true,
    editableValue: false,
    round: true,
    ruleAdd: 0,
    defaultRuleAdd: 0,
    resultField: false,
    nameField: false,
  },
  {
    name: "Vitórias JxJ",
    defaultName: "Vitórias",
    id: 2,
    value: 0,
    editableName: true,
    editableValue: true,
    round: false,
    ruleAdd: 1,
    defaultRuleAdd: 3,
    resultField: false,
    nameField: false,
  },
  {
    name: "Empates",
    defaultName: "Empates",
    id: 3,
    value: 0,
    editableName: true,
    editableValue: true,
    round: false,
    ruleAdd: 0,
    defaultRuleAdd: 1,
    resultField: false,
    nameField: false,
  },
  {
    name: "Derrotas",
    defaultName: "Derrotas",
    id: 4,
    value: 0,
    editableName: true,
    editableValue: true,
    round: false,
    ruleAdd: 0,
    defaultRuleAdd: 0,
    resultField: false,
    nameField: false,
  },
  {
    name: "Pontos",
    defaultName: "Pontos",
    id: 5,
    value: 0,
    editableName: true,
    editableValue: false,
    round: false,
    ruleAdd: 0,
    defaultRuleAdd: 0,
    resultField: true,
    nameField: false,
  },
];

const tableData = [
  { id: 0, headers: JSON.parse(JSON.stringify(headers)) },
  { id: 1, headers: JSON.parse(JSON.stringify(headers)) },
];

const tableHeadElement = document.getElementById("table-head");
const tableElement = document.getElementById("table-data");
let editionMode = false;
const customContainer = document.getElementById("custom-container");
const customFields = document.getElementById("custom-fields");
const pointsColumn = 5;

window.onload = () => {
  reloadTable();
};

function reloadTable(full = true) {
  tableHeadElement.innerHTML = "";
  tableElement.innerHTML = "";

  if (full) {
    tableData.forEach((_, index) => {
      tableData[index].headers = JSON.parse(JSON.stringify(headers));
    });
  }
  showTableHeadElementsInDOM();
  for (let i = 0; i <= getHigherId(tableData); i++) {
    const objectInList = getObjectInList(tableData, i);
    if (objectInList === -1) continue;

    editDefaultPlayerNames(i);
    showTableDataInDOM(objectInList.id);
  }
}

function getResultHeaderField() {
  return headers.filter((header) => header.resultField);
}

function getNameHeaderField() {
  return headers.filter((header) => header.nameField);
}

function getHigherId(list) {
  let higher = -1;
  list.forEach((element) => {
    higher = element.id > higher ? element.id : higher;
  });
  return higher;
}

function getObjectInList(list, id) {
  const objectInList = list.filter((element) => element.id === id);
  return objectInList.length > 0 ? objectInList[0] : -1;
}

function editDefaultPlayerNames(id) {
  const objectInList = getObjectInList(tableData, id);
  const index = tableData.indexOf(objectInList);

  if (tableData[index].headers[0].value === "Player") {
    tableData[index].headers[0].value = `Player${id + 1}`;
  }
}

function showTableHeadElementsInDOM() {
  tableHeadElement.innerHTML = `
        ${headers
          .map(
            ({ name, resultField }, index) => {
              const withresultFieldClass = resultField ? 'class="result-field"' : "";
              return  `
              <th id="th-${index}" ${withresultFieldClass}>
                  <input type="text" class="input-header input show hide" value="${name}" name="header-${index}" id="header-${index}"></input>
                  <span id="header-span-${index}" class="span show">
                      ${name}
                  </span>
              </th>`
          }
          )
          .join("")}
        <th><button class="btn-inside-table" id="btn-clear-score" onClick="clearScore()">Zerar Placar</button></th>
    `;
}

function showTableDataInDOM(id) {
  const lineStyle = id % 2 === 0 ? "line-style" : ""
  tableElement.innerHTML += `
    <tr id="tr-${id}" class='${lineStyle}'>
      ${getLineInTable(id)}
    </tr>`;
}

function addNewPlayer() {
  const newId = getHigherId(tableData) + 1;
  tableData.push({ id: newId, headers: JSON.parse(JSON.stringify(headers)) });
  editDefaultPlayerNames(newId);
  showTableDataInDOM(newId);
  reloadTable(false);
}

function updateLineInTable(id) {
  const lineInTable = document.getElementById(`tr-${id}`);
  lineInTable.innerHTML = getLineInTable(id);
}

function removeLine(lineId) {
  const objectInList = getObjectInList(tableData, lineId);
  const lineIndex = tableData.indexOf(objectInList);
  const lineInTable = document.getElementById(`tr-${lineId}`);
  tableData.splice(lineIndex, 1);
  lineInTable.remove();
  reloadTable(false);
}

function clearTableData() {
  tableData.length = 0;
  tableElement.innerHTML = "";
}

function clearScore() {
  tableData.forEach((e, index) => {
    e.headers.forEach((_, id) => {
      tableData[index].headers[id].value =
        tableData[index].headers[id].editableValue ||
        tableData[index].headers[id].resultField
          ? 0
          : tableData[index].headers[id].value;
    });
  });
  reloadTable(false);
}

function toggleCustomMode(customClass, status = true, force = false) {
  if (force) {
    if (status) {
      customContainer.classList.remove(customClass);
      loadCustomWindow();
    } else {
      customContainer.classList.add(customClass);
    }
  } else {
    if (customContainer.classList.contains(customClass)) {
      customContainer.classList.remove(customClass);
      loadCustomWindow();
    } else {
      customContainer.classList.add(customClass);
    }
  }
}

function loadCustomWindow() {
  customFields.innerHTML = `
    ${headers
      .filter((header) => header.editableValue)
      .map(
        (h, id) => `
      <label for="points-col-${id}">${headers[headers.length - 1].name} por ${
          h.name
        }:</label>
      <input
        type="number"
        name="points-col-${id}"
        id="points-col-${id}"
        class="input-out-table"
        value="${h.ruleAdd}"
      />
    `
      )
      .join("")}`;
}

function confirmCustom() {
  const headersEditable = headers.filter((header) => header.editableValue);
  const newValues = headersEditable.map((_, id) => {
    return {
      id,
      ruleAdd: document.getElementById(`points-col-${id}`).value,
    };
  });
  let hasEdit = false;
  headersEditable.forEach((h, id) => {
    if (
      headers[h.id].editableValue &&
      !isNaN(newValues[id].ruleAdd) &&
      parseInt(newValues[id].ruleAdd) !== headers[h.id].ruleAdd
    ) {
      headers[h.id].ruleAdd = parseInt(newValues[id].ruleAdd);
      hasEdit = true;
    }
  });

  if (hasEdit) {
    reloadTable(false);
  }
  toggleCustomMode("toggle-off", false, true);
}

function toggleEditMode() {
  const elementsToEdit = document.getElementsByClassName("show");
  for (let i of elementsToEdit) {
    i.classList.toggle("hide");
  }
}

function confirmEditions() {
  const inputElements = document.getElementsByClassName("input show");
  const spanElements = document.getElementsByClassName("span");
  const headerId = "header-span";
  let hasHeaderEdit = false;
  let hasFieldEdit = false;

  for (let i = 0; i < inputElements.length; i++) {
    if (
      inputElements[i].value.trim() === spanElements[i].innerHTML.trim() ||
      inputElements[i].value.trim() === ""
    ) {
      continue;
    }

    if (spanElements[i].id.startsWith(headerId)) {
      const getHeaderId = parseInt(spanElements[i].id.split("-")[2]);
      headers[getHeaderId].name = inputElements[i].value.trim().capitalize();
      hasHeaderEdit = true;
    } else {
      const getFieldLineId = spanElements[i].id.split("-");
      const getFieldLine = parseInt(getFieldLineId[1]);
      const getFieldId = parseInt(getFieldLineId[2]);
      console.log(getFieldId);
      console.log(getFieldLine);
      tableData[getFieldLine].headers[getFieldId].value =
        inputElements[i].value.trim();
      hasFieldEdit = true;
    }
  }

  if (hasHeaderEdit) {
    toggleEditMode();
    showTableHeadElementsInDOM();
  } else if (hasFieldEdit) {
    toggleEditMode();
    reloadTable(false);
  } else {
    toggleEditMode();
  }
}

function getLineInTable(lineId) {
  const objectInList = getObjectInList(tableData, lineId);
  const index = tableData.indexOf(objectInList);
  return `
        ${tableData[index].headers
          .map(({ value, id, editableValue, nameField, resultField }) => {
            
            const withresultFieldClass = resultField ? `class="result-field"` : '';
            const inputNameField = nameField
              ? `<input type="text" class="input-header input show hide" value="${value}" name="name-${index}" id="name-${index}"><span class="span show" id="field-${index}-${id}">${value}</span></input>`
              : `<span id="field-${index}-${id}">${value}</span>`;

            const editableButtons = editableValue
              ? `
                <div class="plus-minus">
                    <button id="btn-plus-${index}-${id}" onclick="updateFieldValue(${index}, ${id}, ${-1})">-</button>
                    ${inputNameField}
                    <button id="btn-minus-${index}-${id}" onclick="updateFieldValue(${index}, ${id}, ${1})">+</button>
                </div>`
              : `${inputNameField}`;

            return `    
            <td ${withresultFieldClass}>
                <div class="data-line">
                ${editableButtons}  
                </div>    
            </td>`;
          })
          .join("")}
        <td><button class="btn-inside-table" id="btn-remove-${lineId}" onClick="removeLine(${lineId})">Excluir</button></td>
    `;
}

function updateFieldValue(index, id, amount) {
  if (!updateRound(index, amount)) {
    return false;
  }

  const field = document.getElementById(`field-${index}-${id}`);
  const resultHeaderField = getResultHeaderField()[0];
  const fieldResult = document.getElementById(
    `field-${index}-${resultHeaderField.id}`
  );

  tableData[index].headers[id].value += amount;
  field.innerHTML = tableData[index].headers[id].value;

  tableData[index].headers[resultHeaderField.id].value +=
    headers[id].ruleAdd * amount;
  fieldResult.innerHTML = tableData[index].headers[resultHeaderField.id].value;
  sortTable(pointsColumn);
  return true;
}

function updateRound(index, amount) {
  const headRound = headers.filter((head) => head.round)[0];
  const roundField = document.getElementById(`field-${index}-${headRound.id}`);

  if (tableData[index].headers[headRound.id].value <= 0) {
    tableData[index].headers[headRound.id].value = 0;
    if (amount < 0) {
      return false;
    }
  }

  tableData[index].headers[headRound.id].value += 1 * amount;
  roundField.innerHTML = tableData[index].headers[headRound.id].value;
  return true;
}

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  },
  enumerable: false,
});

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("score-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "desc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n].childNodes[1].childNodes[1];
      y = rows[i + 1].getElementsByTagName("TD")[n].childNodes[1].childNodes[1];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          console.log(x.innerHTML);
          console.log(y.innerHTML);
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
