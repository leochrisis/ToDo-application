<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            To Do list
          </h1>
          <h2 class="subtitle">
            Try this application, and have fun.
          </h2>
        </div>
      </div>
    </section>
    <hr/>
    <div class="container">
      <div class="columns">
        <div class="column is-6">
          <div v-if="input.newToDo" class="box">
            <div class="content">
              <form
                method="post"
                >
                <p>
                  <strong>
                		<p class="control">
			                <input 
			                  v-model="input.title" 
			                  class="input" 
			                  type="text" 
			                  placeholder="To Do title"
			                 >
                		</p>
                	</strong>
                	<br>
	                <p class="control">
	                  <textarea 
	                    class="textarea" 
	                    placeholder="To Do description" 
	                    v-model="input.description"
	                    >
	                  </textarea>
	                </p>
	                <article>
	                  <small>
		                  <a @click="addInput()">
		                  	Save
		                  </a> · 
		                  <a @click="closeInput">
		                  	Cancel
		                  </a>
	                  </small>
	                </article>
                </p>
              </form>
            </div>
          </div>

          <draggable 
            v-model="list"
            @start="drag=true" 
            @end="drag=false"
          >
            <div v-for="(todo, index) in list">
              <div class="box">
                <article class="media">
                  <div class="content">
                    <p>
                      <strong>{{todo.title}}</strong>
                      <br>{{todo.description}}<br>
                      <small>
                        <a @click="openAddInput(index)">
                          Add
                        </a> . 
                      	<a @click="openEditInput(todo, index)">
                      		Edit
                      	</a> · 
                      	<a @click="openMoveInput(index)">
                      		move
                      	</a> . 
                      	<a @click="removeToDo(index)">
                      		Delete
                      	</a> 
                      </small>
                    </p>
                  </div>
                </article>
              </div>
              <br/>

	            <draggable 
		            v-model="todo.children"
		            @start="drag=true" 
		            @end="drag=false"
	          	>
	              <div v-for="(child, j) in todo.children">
              		<article class="media">
	              		<figure class="media-left">
							        <p class="image is-48x48"></p>
							      </figure>
								    <div class="media-content box">
		                  <div class="content">
		                    <p>
		                      <strong>{{child.title}}</strong>
		                      <br>{{child.description}}<br>
		                      <small>
		                      	<a @click="openEditInput(child, index, j)">
		                      		Edit
		                      	</a> · 
		                      	<a @click="openMoveInput(index, j)">
		                      		move
		                      	</a> . 
		                      	<a @click="removeToDo(index, j)">
		                      		Delete
		                      	</a> 
		                      </small>
		                    </p>
		                  </div>
		                </div>
	                </article>
	                <br/>
	              </div>
	            </draggable>
	          </div>
          </draggable>
        </div>

        <div class="container">
          <div class="columns">
            <div class="column is-half is-offset-3">
              <button 
                class="button is-primary is-fullwidth"
                @click="openAddInput()"
               >
              	Add a new thing to do
              </button>
              <br/>
              <button 
                v-if="undoList.length > 0" 
                class="button is-info is-fullwidth"
                @click="undo"
                >
                Undo
              </button>
              <div v-if="input.editToDo" class="box">
                <article class="media">
                  <div class="content">
                    <form
                      method="post"
                      @submit.prevent="editInput"
                      @keyup.13="editInput"
                     >
                      <p>
                        <strong>
		                      <p class="control">
		                      	<input v-model="input.title" class="input" type="text" placeholder="To Do title">
		                      </p>
                      	</strong>
                      	<br>
	                      <p class="control">
	                        <textarea class="textarea" placeholder="Textarea" v-model="input.description"></textarea>
	                      </p>
	                      <br>
	                      <small>
	                      	<a @click="editInput">
	                      		Save
	                      	</a> · 
	                      	<a @click="closeInput">
	                      		Cancel
	                      	</a>
	                      </small>
                      </p>
                    </form>
                  </div>
                </article>
              </div>
              <br/>
              <div v-if="moveInput.moveToDo" class="box">
                <article class="media">
                  <div class="content">
                    <form
                      method="post"
                      @submit.prevent="moveTo"
                      @keyup.13="moveTo"
                    >
                      <p>
                        <strong>
                      		<p v-if="moveInput.parent">Current position: {{moveInput.index}}</p>
                          <p v-else>Current position: {{moveInput.child}}</p>
                      	</strong>
                      	<br>
	                      <p class="control">
	                        <input 
	                          class="input" 
	                          placeholder="Move to..." 
	                          v-model="moveInput.newPosition"
	                        >
	                      </p>
	                      <br>
	                      <small>
	                      	<a @click="moveTo">
	                      		Move
	                      	</a> · 
	                      	<a @click="closeMoveInput">
	                      		Cancel
	                      	</a>
	                      </small>
	                    </p>
                    </form>
                  </div>
                </article>
              </div>
              <br/>
              <div v-if="input.toDoChild" class="box">
                <div class="content">
                  <form
                    method="post"
                    >
                    <p>
                      <strong>
                        <p class="control">
                          <input 
                            v-model="input.title" 
                            class="input" 
                            type="text" 
                            placeholder="To Do title"
                           >
                        </p>
                      </strong>
                      <br>
                      <p class="control">
                        <textarea 
                          class="textarea" 
                          placeholder="To Do description" 
                          v-model="input.description"
                          >
                        </textarea>
                      </p>
                      <article>
                        <small>
                          <a @click="addInput">
                            Save
                          </a> · 
                          <a @click="closeInput">
                            Cancel
                          </a>
                        </small>
                      </article>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  const emptyMove = {
    newPosition: null,
    moveToDo: false,
    parent: true
  }

  const emptyInput = {
    id: false,
    editToDo: false,
    newToDo: false,
    toDoChild: false,
    title: '',
    description: '',
    index: 0
  }

  export default {
    name: 'Home',

    components: {draggable},

    data() {
      return {
        input: emptyInput,
        moveInput: emptyMove,
        list: [],
        undoList: [],
        undo: {
          add: false
        }
      }
    },

    created() {
      this.list = [
        {
          id: 0,
          title: 'funciona!',
          description: 'o fernando é feioso',
          children: [
          {
          	title: 'sou um filho.',
          	description: 'testes de sempre'
          },
          {
          	title: 'nada de bom aconteceu',
          	description: 'nothing at all'
          }
          ]
        },

        {
          id: 1,
          title: 'lalala',
          description: 'lala',
          children: []
        }
      ]
      localStorage.setItem('list', JSON.stringify(this.list))
    },

    methods: {
      closeInput() {
        this.input.title = '',
        this.input.description = '',
        this.input.newToDo = false,
        this.input.editToDo = false,
        this.input.index = 0,
        this.input.toDoChild = false
      },

      closeMoveInput() {
        this.moveInput.newPosition = null,
          this.moveInput.moveToDo = false
      },

      addInput() {
        const parent = this.input.parent

        if (parent !== false){
          this.list[parent].children.unshift({
            title: this.input.title,
            description: this.input.description
          })
        } else {
          this.list.unshift({
            title: this.input.title,
            description: this.input.description
          })
        }
        this.undoList = this.list
        localStorage.setItem('undoList', JSON.stringify(this.undoList))
        this.closeInput()
      },

      openAddInput(parent = false) {
        this.input = {
          ...emptyInput,
          parent
        }

        if(parent !== false) {
          this.input.toDoChild = true
        } else {
          this.input.newToDo = true
        }
      },

      removeToDo(index, child = false) {
        if (confirm('Are you sure you want to delete this To Do?')) {
        	if(child === false)	{
          	this.list.splice(index, 1)
        	} else {
        		this.list[index].children.splice(child, 1)
        	}
          this.undoList = this.list
          this.undo.add = false
          localStorage.setItem('undoList', JSON.stringify(this.undoList))
        }
      },

      openEditInput(todo, index, child = false) {
        const {title, description, id} = todo

        this.input = {
          ...emptyInput,
          editToDo: true,
          title,
          description,
          index,
          id,
          child
        }
      },

      openMoveInput(index, child = false) {
        this.moveInput = {
          ...emptyMove,
          moveToDo: true,
          index,
          child
        }
        if(child !== false) {
          this.moveInput.parent = false
        }
      },

      editInput() {
        const {title, description, index, child = false} = this.input

      	if(this.input.child !== false) {  
          Object.assign(this.list[index].children[child], {
            title,
            description 
          }) 
        	this.closeInput()
      	}else {
      		Object.assign(this.list[index], {
            title,
            description 
          })
        	this.closeInput()	
      	}
      },

      moveTo() {
        const {index, newPosition, child} = this.moveInput
        var moveObj = this.list[index]
        var moveChild = this.list[index].children[child]
      
        if(child !== false){
          this.list[index].children.splice(child , 1)
          this.list[index].children.splice(newPosition, 0, moveChild)
        } else {
          this.list.splice(index, 1)
          this.list.splice(newPosition, 0, moveObj)
        }
        this.closeMoveInput()
      },
    }
  }
</script>
