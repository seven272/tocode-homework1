const App = {
 data () {
  return {
   title: 'Notes',
   input: {
    value: '',
    placeholder: 'type ur note...'
   },
   notes: [],
   errors: [],
   isEdit: false,
   editingNote: {}
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

   if (this.checkForm (this.input.value)) {
    let objNote = {
     id:  Math.random().toString(16).slice(10),
     value: this.input.value
    }
    this.notes.push(objNote)
    this.input.value = ''
   }
  },
  remove (ind) {
   this.notes.splice(ind, 1)
  },
  onEdit (playloder) {
   this.isEdit = true
   let note = this.notes.find(function (item) {
    return item.id === playloder.id
   })
   //копируем обьект
   let nextNote = Object.assign({}, note);
   this.editingNote = nextNote
   console.log(this.editingNote)
  },

  sendModifyNote () {
   if (this.checkForm (this.editingNote.value)) {
      //ищем индекс элемента
     let index = this.notes.findIndex(elem => elem.id === this.editingNote.id)
    //удаляем элемент массива и вставляем новый
     this.notes.splice(index, 1, this.editingNote)
     this.editingNote = {}
     this.isEdit = false
   }
   
  },
  
  //валидация инпутов на минимальную и маскисмальную длинну, а также на заполнение. Так как инпутов 2, то нужный передаем параметром при вызове метода
  checkForm (someInput) {
   this.errors = []

   if (!someInput) {
    this.errors.push('Требуется ввести значение')
   } else if (someInput.length < 3) {
    this.errors.push('Значение не может быть меньше трех символов')
   } else if (someInput.length > 10) {
    this.errors.push('Значение не может быть больше десяти символов')
   }
   // если в массиве с ошибками нет значение, возвращается true и происходит отправка формы с веденнеыми данными
   if (!this.errors.length) {
    return true
   }
  }
 }
}

Vue.createApp(App).mount('#app')