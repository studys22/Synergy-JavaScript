const STORAGE_NAME = 'notes';

const PREFIX_NOTE = 'note_';
const PREFIX_NOTE_LENGTH = PREFIX_NOTE.length;

const PREFIX_TEXT_NOTE = 'textNote_';

const PREFIX_BUTTONS_NOTE = 'buttonsNote_';
const PREFIX_EDIT_NOTE = 'editNote_';
const PREFIX_DELETE_NOTE = 'deleteNote_';

function newObjectStorage() {
    return {
        lastId: 0,
        list: []
    }
}

function newlistStorage(id = '', text = '') {
    return {
        id: id,
        text: text
    }
}

function saveNotesToStorage(notes) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(notes));
}

function getNotesFromStorage() {
    let notes = localStorage.getItem(STORAGE_NAME);
    notes = notes === null ? newObjectStorage() : JSON.parse(notes);
    return notes;
}

function addNewNote(id, text, updateTotal = false) {

    let listNotes = document.getElementById('listNotes');

    let newNote = document.createElement('div');
    newNote.classList.add('note', 'card', 'card-body');
    let noteId = `${PREFIX_NOTE}${id}`;
    newNote.setAttribute('id', noteId);
    let listHead = document.getElementById('listHead');
    listHead.after(newNote);

    let newTextNote = document.createElement('div');
    newTextNote.classList.add('textNote');
    newTextNote.setAttribute('id', `${PREFIX_TEXT_NOTE}${id}`);
    newTextNote.textContent = text;
    newNote.appendChild(newTextNote);

    let newButonsNote = document.createElement('div');
    newButonsNote.classList.add('buttonsNote', 'btn-group');
    newButonsNote.setAttribute('role', 'group');
    newButonsNote.setAttribute('id', `${PREFIX_BUTTONS_NOTE}${id}`);
    newNote.appendChild(newButonsNote);

    let editButton = document.createElement('button');
    editButton.classList.add('editButton', 'button', 'btn', 'btn-primary');
    editButton.setAttribute('id', `${PREFIX_EDIT_NOTE}${id}`);
    editButton.textContent = 'Изменить';
    newButonsNote.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton', 'button', 'btn', 'btn-danger');
    deleteButton.setAttribute('id', `${PREFIX_DELETE_NOTE}${id}`);
    deleteButton.textContent = 'Удалить';
    newButonsNote.appendChild(deleteButton);

    editButton.onclick = () => {

        changeDisplayNoteButtons('edit');

        let currentNoteLabel = document.getElementById('currentNoteLabel');
        currentNoteLabel.textContent = 'Редактируемая заметка';

        let noteText = document.getElementById('noteText');
        let notes = getNotesFromStorage();
        let [note, index] = getNoteById(notes, id);
        noteText.value = note.text;

        let currentNote = document.getElementById('currentNote');

        if (currentNote.hasAttribute('data-cur-id')) {
            let prevId = currentNote.getAttribute('data-cur-id');
            let prevNoteId = `${PREFIX_NOTE}${prevId}`;
            let prevNote = document.getElementById(prevNoteId);
            prevNote.classList.remove('beingEdited');

            let prevEditButtonId = `${PREFIX_EDIT_NOTE}${prevId}`;
            let prevEditButton = document.getElementById(prevEditButtonId);
            prevEditButton.disabled = false;

            let prevDeleteButtonId = `${PREFIX_DELETE_NOTE}${prevId}`;
            let prevDeleteButton = document.getElementById(prevDeleteButtonId);
            prevDeleteButton.disabled = false;
        }

        newNote.classList.add('beingEdited');
        currentNote.setAttribute('data-cur-id', id);

        editButton.disabled = true;
        deleteButton.disabled = true;

    }

    deleteButton.onclick = () => {

        newNote.classList.remove('show');
        newNote.ontransitionend = function (e) {
            if (e.propertyName !== 'opacity') {
                return;
            }
            newNote.remove();
            let notes = getNotesFromStorage();
            let [note, index] = getNoteById(notes, id);

            if (index !== null) {
                notes.list.splice(index, 1);
                saveNotesToStorage(notes);
                updateTotalNumber(notes.list.length);
            }
        }

    };

    if (updateTotal) {
        setTimeout((newNote) => {
            newNote.classList.add('show');
            newNote.ontransitionend = function (e) {
                if (e.propertyName !== 'opacity') {
                    return;
                }
                updateTotalNumber();
            }

        }, 0, newNote)

    } else {
        newNote.classList.add('show');
        updateTotalNumber();
    }

}

function getNoteById(notes, id) {
    let found = false;
    let note, i;
    for (i = 0; i < notes.list.length; i++) {
        note = notes.list[i];
        if (note.id === id) {
            found = true;
            break;
        }
    }

    return found ? [note, i] : [null, null];
}

function updateTotalNumber(lastId = undefined) {

    if (lastId === undefined) {
        let notes = getNotesFromStorage();
        lastId = notes === null ? 0 : notes.list.length;
    }

    let listHead = document.getElementById('listHead');
    let newText = `Всего заметок: ${lastId}`;
    listHead.textContent = newText;
}

function changeDisplayButton(id, display) {
    let button = document.getElementById(id);
    if (button === null) {
        console.log(`Не найдена кнопка с id='${id}'`)
        return;
    }
    if (display) {
        button.classList.remove('hide-button');
        button.classList.add('display-button');
    } else {
        button.classList.remove('display-button');
        button.classList.add('hide-button');
    }

}

function changeDisplayNoteButtons(mode) {
    if (mode === 'create') {
        changeDisplayButton('create', true);
        changeDisplayButton('save', false);
        changeDisplayButton('cancel', false);
    } else {
        changeDisplayButton('create', false);
        changeDisplayButton('save', true);
        changeDisplayButton('cancel', true);
    }
}

function createClick() {

    let noteText = document.getElementById('noteText');
    let text = noteText.value;

    if (text === '') {
        alert('Пустая заметка не будет сохранена');
        return;
    }

    let notes = getNotesFromStorage();
    let lastId = notes.lastId;
    let nextNumber = lastId + 1;
    notes.lastId = nextNumber;

    notes.list.push(newlistStorage(nextNumber, text));
    saveNotesToStorage(notes);
    noteText.value = '';

    addNewNote(nextNumber, text, true);
}

function saveClick() {
    clearAndSaveCuentText(true);
}

function cancelClick() {
    clearAndSaveCuentText();
}

function clearAndSaveCuentText(save = false) {
    changeDisplayNoteButtons('create');

    let currentNoteLabel = document.getElementById('currentNoteLabel');
    currentNoteLabel.textContent = 'Новая заметка';

    let noteText = document.getElementById('noteText');
    let newText = noteText.value;
    noteText.value = '';

    let currentNote = document.getElementById('currentNote');

    if (currentNote.hasAttribute('data-cur-id')) {
        let prevId = currentNote.getAttribute('data-cur-id');
        let prevNoteId = `${PREFIX_NOTE}${prevId}`;
        let prevNote = document.getElementById(prevNoteId);
        prevNote.classList.remove('beingEdited');

        let prevEditButtonId = `${PREFIX_EDIT_NOTE}${prevId}`;
        let prevEditButton = document.getElementById(prevEditButtonId);
        prevEditButton.disabled = false;

        let prevDeleteButtonId = `${PREFIX_DELETE_NOTE}${prevId}`;
        let prevDeleteButton = document.getElementById(prevDeleteButtonId);
        prevDeleteButton.disabled = false;

        if (save) {
            let prevTextNoteId = `${PREFIX_TEXT_NOTE}${prevId}`;
            let prevTextNote = document.getElementById(prevTextNoteId);
            prevTextNote.textContent = newText;

            let notes = getNotesFromStorage();
            let [note, index] = getNoteById(notes, +prevId);

            if (index !== null) {
                note.text = newText;
                saveNotesToStorage(notes);
            }
        }
    }
}

function init() {

    let notes = getNotesFromStorage();

    for (let i = 0; i < notes.list.length; i++) {
        let note = notes.list[i];
        addNewNote(note.id, note.text);
    }

    updateTotalNumber(notes.list.length);

}

init();