const arr = [
  {
    ID: 1,
    description: "Importação de arquivos de fundos",
    "Data Máxima de conclusão": "2019-11-10 12:00:00",
    "Tempo estimado": "2 horas",
  },
  {
    ID: 2,
    description: "Importação de dados da Base Legada",
    "Data Máxima de conclusão": "2019-11-11 12:00:00",
    "Tempo estimado": "4 horas",
  },
  {
    ID: 3,
    description: "Importação de dados de integração",
    "Data Máxima de conclusão": "2019-11-11 08:00:00",
    "Tempo estimado": "6 horas",
  },
];
console.clear();

const sortByTime = arr.sort((a, b) => {
  if (parseInt(a["Tempo estimado"]) > parseInt(b["Tempo estimado"])) {
    return -1;
  }
  return 0;
});

let array = [];

const format = (item) => parseInt(item["Tempo estimado"]);

function filter(items) {
  const firstItem = items[0];
  const teste = format(firstItem);

  if (teste === 8) {
    array = [...array, firstItem.ID];
    sortByTime.splice(0, 1);
  } else {
    items.forEach((item, index) => {
      if (index) {
        if (format(item) + teste === 8) {
          array = [...array, [firstItem.ID, item.ID]];
          sortByTime.splice(index, 1);
          sortByTime.splice(0, 1);
        }
      }
    });
  }
  console.log();
  if (items.length === 1) {
    array = [...array, items];
  }
}

filter(sortByTime);

// console.log(sortByTime);
console.log(array);
