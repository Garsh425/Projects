(() => {
  const studentsList = [
    {
      surname: 'Коринец',
      name: 'Кирилл',
      middlename: 'Максимович',
      date: '03.04.1998',
      year: '2016',
      faculty: 'Перевод'
    },
    {
      surname: 'Воробьев',
      name: 'Илья',
      middlename: 'Игоревич',
      date: '03.04.1995',
      year: '2014',
      faculty: 'Юрист'
    },
    {
      surname: 'Капутин',
      name: 'Роман',
      middlename: 'Олегович',
      date: '02.05.1994',
      year: '2012',
      faculty: 'Финансовый'
    },
  ];

  function createStudentList() {
    const container = document.getElementById('students-app');
    const list = document.createElement('ul');

    list.id = 'students-list';
    list.classList.add('list-group');

    container.append(list);
  };

  function getStudentItem(studentObj) {
    const container = document.getElementById('students-list');
    const item = document.createElement('li');

    item.classList.add('list-group', 'list-group-horizontal');

    container.append(item);

    for (let i = 0; i < 6; i++) {
      const studentItemField = document.createElement('div');
      studentItemField.textContent = Object.values(studentObj)[i];
      studentItemField.classList.add('list-group-item');
      studentItemField.style = 'width: calc(100% / 6)';
      item.append(studentItemField);
    }
  };

  function renderStudentsTable(studentsArray) {
    studentsArray.forEach(studentObj => {
      getStudentItem(studentObj);
    });
  };

  function createStudentForm() {
    const container = document.getElementById('students-app');
    const form = document.createElement('form');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-2');
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');

    button.textContent = 'Добавить студента';

    button.id = 'add-button';
    form.id = 'student-form';

    for (let i = 1; i <= 6; i++) {
      const input = document.createElement('input');
      input.setAttribute('required', 'true');
      input.classList.add('form-control');
      form.append(input);

      input.addEventListener('input', () => {
        input.value = input.value.trim();
      });

      switch (i) {
        case 1:
          input.placeholder = 'Введите фамилию';
          input.id = 'input-surname';
          break;
        case 2:
          input.placeholder = 'Введите имя';
          input.id = 'input-name';
          break;
        case 3:
          input.placeholder = 'Введите отчество';
          input.id = 'input-middlename';
          break;
        case 4:
          input.setAttribute('onfocus', "type='date'");
          input.setAttribute('onblur', "type='text'");
          input.placeholder = 'Введите дату рождения';
          input.id = 'input-date';
          break;
        case 5:
          input.placeholder = 'Введите год поступления';
          input.setAttribute('type', 'number');
          input.id = 'input-year';
          break;
        case 6:
          input.placeholder = 'Введите факультет';
          input.id = 'input-faculty';
          break;
      }
    };

    container.append(form);
    buttonWrapper.append(button);
    form.append(buttonWrapper);
  }

  function createSorterItem(button, prop, dir = false) {
    button.addEventListener('click', () => {
      const container = document.getElementById('students-list');
      dir ? dir = false : dir = true;
      studentsList.sort((a, b) => (dir ? a[prop] > b[prop] : a[prop] < b[prop]) ? 1 : -1);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      };
      renderStudentsTable(studentsList);
    });
  };

  function createSorter() {
    const container = document.getElementById('students-app');
    const filterWrapper = document.createElement('div');

    filterWrapper.classList.add('list-group', 'list-group-horizontal');

    container.append(filterWrapper);

    for (let i = 1; i <= 6; i++) {
      const button = document.createElement('button');

      button.classList.add('list-group-item-action', 'list-group-item-primary');

      filterWrapper.append(button);

      switch (i) {
        case 1:
          button.textContent = 'Фамилия';
          createSorterItem(button, 'surname');
          break;
        case 2:
          button.textContent = 'Имя';
          createSorterItem(button, 'name');
          break;
        case 3:
          button.textContent = 'Отчество';
          createSorterItem(button, 'middlename');
          break;
        case 4:
          button.textContent = 'Дата рождения';
          createSorterItem(button, 'date');
          break;
        case 5:
          button.textContent = 'Год поступления';
          createSorterItem(button, 'year');
          break;
        case 6:
          button.textContent = 'Факультет';
          createSorterItem(button, 'faculty');
          break;
      };
    };
  };

  function createFilter() {
    const container = document.getElementById('students-app');
    const form = document.createElement('form');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');
    const input = document.createElement('input');

    form.classList.add('input-group', 'mb-2');
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Отфильровать';
    button.id = 'add-button';
    form.id = 'student-form';
    input.placeholder = 'Введите данные';

    input.setAttribute('required', 'true');
    input.classList.add('form-control');
    form.append(input);

    input.addEventListener('input', () => {
      input.value = input.value.trim();
    });

    container.append(form);
    buttonWrapper.append(button);
    form.append(buttonWrapper);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    createStudentForm();
    const studentForm = document.getElementById('student-form');
    createFilter();
    createSorter();
    createStudentList();
    renderStudentsTable(studentsList);
    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const container = document.getElementById('students-list');
      const date2 = document.getElementById('input-date').value.split('-');
      if (document.getElementById('input-date').value < new Date(1900, 1, 1).toISOString()) {
        alert('Дата рождения меньше 01.01.1900');
      } else if (document.getElementById('input-year').value < 2000) {
        alert('Год поступления меньше 2000');
      } else {
        if ((new Date().getFullYear() - document.getElementById('input-year').value) > 4) {
          studentsList.push({
            name: document.getElementById('input-name').value,
            surname: document.getElementById('input-surname').value,
            middlename: document.getElementById('input-middlename').value,
            date: `${date2[2]}.${date2[1]}.${date2[0]}`,
            year: `${document.getElementById('input-year').value}-${Number(document.getElementById('input-year').value) + 4} (Закончил обучение)`,
            faculty: document.getElementById('input-faculty').value
          });
        } else {
          studentsList.push({
            name: document.getElementById('input-name').value,
            surname: document.getElementById('input-surname').value,
            middlename: document.getElementById('input-middlename').value,
            date: `${date2[2]}.${date2[1]}.${date2[0]}`,
            year: `${document.getElementById('input-year').value}-${Number(document.getElementById('input-year').value) + 4} (${new Date().getFullYear() - document.getElementById('input-year').value} курс)`,
            faculty: document.getElementById('input-faculty').value
          });
        }
        const inputs = document.querySelectorAll('input');
        for (let input of inputs) {
          input.value = '';
        };
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        };
        renderStudentsTable(studentsList);
      }
    });
  });
})();
