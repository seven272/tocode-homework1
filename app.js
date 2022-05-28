const App = {
 data () {
  return {
   title: 'Notes',
   input: {
    value: '',
    placeholder: 'type ur note...'
   },
   notes: [],
   isEdit: false,
   valueEditedNote: '',
   idEditedNote: '',
   // editedNote: {
   //  id: '',
   //  value: 'xxx',
   // }
  }
 },

 watch: {
  notes: {
   handler: function (updatedList) {
    localStorage.setItem('notes', JSON.stringify(updatedList))
   },
   deep: true
  }
 },

 mounted () {
  this.getNotes()
 },
 methods: {
  getNotes () {
   const localNotes = localStorage.getItem('notes')
   if (localNotes) {
    this.notes = JSON.parse(localNotes)
   }
  },
  onSubmit (evt) {
   evt.preventDefault()
   let objNote = {
    id:  Math.random().toString(16).slice(10),
    value: this.input.value
   }
   this.notes.push(objNote)
   this.input.value = ''
  },
  remove (ind) {
   this.notes.splice(ind, 1)
  },
  onEdit (playloder) {
   this.isEdit = true
   let note = this.notes.find(function (item) {
    return item.id === playloder.id
   })
   this.valueEditedNote = note.value
   this.idEditedNote = note.id
  },
  sendModifyNote () {
   //ищем индекс элемента
   let index = this.notes.findIndex(elem => elem.id === this.idEditedNote)
   //формируем новый обьект из отредактированных значений
   let editNote = {
    id: this.idEditedNote,
    value: this.valueEditedNote
   }
   //удаляем элемент массива и вставляем новый
   this.notes.splice(index, 1, editNote)
   this.valueEditedNote = ''
   this.idEditedNote = ''
   this.isEdit = false

  }
 }
}

Vue.createApp(App).mount('#app')