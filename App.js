import React, { useState } from 'react';
import classes from './App.module.css';
import ActionButtons from './UI/DeleteButton/ActionButtons'

const App = () => {
  const [allItems, setItems] = useState(JSON.parse(localStorage.getItem("allEntries")))
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputColor, setInputColor] = useState('');
  const [onEditMode, setOnEditMode] = useState({
    status: false,
    rowKey: null
  })

  let entry1 = {
    "name": 'name1',
    "type": 'type1',
    "color": '#f90b0b',
  };
  let entry2 = {
    "name": 'name2',
    "type": 'type2',
    "color": '#0a5c8f',
  };
  let entry3 = {
    "name": 'name3',
    "type": 'type3',
    "color": '#8f5b5b',
  };
  let entry4 = {
    "name": 'name4',
    "type": 'type4',
    "color": '#d0b83e',
  };

  let entries = [];
  entries.push(entry1);
  entries.push(entry2);
  entries.push(entry3);
  entries.push(entry4);

  localStorage.setItem("allEntries", JSON.stringify(entries))

  const addEntry = () => {
    
    allItems.push({
      "name": inputName,
      "type": inputType,
      "color": inputColor,
    });
    localStorage.setItem("allEntries", JSON.stringify(allItems));
    setItems(JSON.parse(localStorage.getItem("allEntries")));
    setInputName('');
    setInputType('');
    setInputColor('');
  }

  const onClickDeleteButton = (event) => {
    allItems.splice(event.target.closest('TR').id, 1)
    localStorage.setItem("allEntries", JSON.stringify(allItems))
    setItems(JSON.parse(localStorage.getItem("allEntries")))
  }

  const onClickEditButton = ({ id, currentName, currentColor }) => {
    setOnEditMode({
      status: true,
      rowKey: id
    });
    setName(currentName);
    setColor(currentColor);
  };

  const onSave = (index) => {
    allItems[index] = {
      "name": name,
      "type": type,
      "color": color,
    }
    localStorage.setItem("allEntries", JSON.stringify(allItems))
    setItems(JSON.parse(localStorage.getItem("allEntries")))
    setOnEditMode({
      status: false,
      rowKey: null
    })
    setName('');
    setType('');
    setColor('');
  }

  return (
    <div className={classes.App}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tableHead}>
            <th className={classes.rowNumber}></th>
            <th>Name</th>
            <th>Type</th>
            <th>Color</th>
            <th className={classes.rowAction}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allItems.map((entry, index) => (

              <tr className={classes.data} id={index} key={index}>
                <td>
                  {index + 1}
                </td>
                <td>
                  {
                    onEditMode.status && onEditMode.rowKey === index ? (
                      <input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder='Enter name' />
                    ) : (
                      entry.name
                    )
                  }
                </td>
                <td>
                  {
                    onEditMode.status && onEditMode.rowKey === index ? (
                      <select value={type} onChange={event => setType(event.target.value)}>
                        <option></option>
                        <option>Main</option>
                        <option>Side</option>
                        <option>Lower</option>
                      </select>
                    ) : (
                      entry.type
                    )
                  }
                </td>
                <td>
                  {
                    onEditMode.status && onEditMode.rowKey === index ? (
                      <input
                        onChange={event => setColor(event.target.value)}
                        value={color}
                        type='color'
                      />
                    ) : (
                      entry.color
                    )
                  }
                </td>
                {
                  onEditMode.status && onEditMode.rowKey === index ?
                    (
                      <ActionButtons
                      elementType='save' 
                      saveItem={() => onSave(index, entry)}/>
                    ) : (
                      <td>
                        <ActionButtons
                          elementType='delete'
                          deleteItem={entry => onClickDeleteButton(entry)} />
                        <ActionButtons
                          elementType='edit'
                          editItem={() => onClickEditButton({ id: index, currentName: entry.name, currentColor: entry.color })} />
                      </td>
                    )
                }
              </tr>
            ))}
          <tr className={classes.data}>
            <td></td>
            <td>
              <input
              value={inputName}
                onChange={event => setInputName(event.target.value)}
                placeholder='Enter name' />
            </td>
            <td>
              <select
              value={inputType}
                onChange={event => setInputType(event.target.value)}>
                  <option></option>
                <option>Main</option>
                <option>Side</option>
                <option>Lower</option>
              </select>
            </td>
            <td>
              <input
              value={inputColor}
                type='color'
                onChange={event => setInputColor(event.target.value)} />
            </td>

          </tr>
        </tbody>
      </table>
          <ActionButtons elementType='add' addItem={addEntry}>Add Item</ActionButtons>
    </div>
  );
}

export default App;
