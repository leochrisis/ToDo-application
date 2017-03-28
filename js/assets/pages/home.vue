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
      		<div v-for="(todo, index) in list">
		        <article class="media">
				    <div class="content">
				      <p>
				        <strong>{{todo.title}}</strong>
				        <br>{{todo.description}}<br>
				        <small>
				        	<a 
				        		@click="openEditImput(todo, index)"
				        	>
				        		Edit
				        	</a> · 
				        	<a @click="removeToDo(index)">
				        		Delete
				        	</a> 
				        </small>
				      </p>
				    </div>
				</article>
				<br/>
			</div>

	      	<div v-if="imput.newToDo">
		        <article class="media">
				    <div class="content">
				      <form
		                method="post"
		                @submit.prevent="addImput"
		                @keyup.13="addImput"
		              >
				      <p>
				        <strong>
				        	<p class="control">
							  <input v-model="imput.title" class="input" type="text" placeholder="To Do title">
							</p>
				        </strong>
				        <br>
				        	<p class="control">
							  <textarea class="textarea" placeholder="Textarea" v-model="imput.description"></textarea>
							</p>
				        <br>
				        <small>
					        <a>
					        	Save
					        </a>
					        </a>  · 
					        <a 
					        	@click="imput.newToDo = false"
					        >
					        	Cancel
					        </a>
				        </small>
				      </p>
				     </form>
				    </div>
				</article>
				</div>
			</div>

			<div v-if="imput.editToDo">
		        <article class="media">
				    <div class="content">
				      <form
		                method="post"
		                @submit.prevent="editImput"
		                @keyup.13="editImput"
		              >
				      <p>
				        <strong>
				        	<p class="control">
							  <input v-model="imput.title" class="input" type="text" placeholder="To Do title">
							</p>
				        </strong>
				        <br>
				        	<p class="control">
							  <textarea class="textarea" placeholder="Textarea" v-model="imput.description"></textarea>
							</p>
				        <br>
				        <small>
					        <a>
					        	Save
					        </a>
					        </a>  · 
					        <a 
					        	@click="imput.editToDo = false"
					        >
					        	Cancel
					        </a>
				        </small>
				      </p>
				     </form>
				    </div>
				</article>
				</div>
			</div>



		<div class="container">
	      <div class="columns">
	      	<div class="column is-one-third is-offset-6">
	            <button 
	            	class="button is-primary"
	            	@click="imput.newToDo = true"
	            >
	            	Add a new thing to do
	            </button>
	      </div>
	     </div>
    	</div>
    </div>
   </div>
  </div>
</template>

<script type="text/javascript">

const emptyImput = {
  id: false,
  editToDo: false,
  newToDo: false,
  title: '',
  description: ''
}

	export default{
		name: 'Home',

		data() {
			return {
				imput: emptyImput,
				list: []
			}
		},

		async created() {
			this.list =[
				{
					id: 0,
					title: 'funciona!',
					description: 'o fernando é feioso'
				},

				{
					id: 1,
					title: 'lalala',
					description: 'lala'
				}
			]
		},

		methods: {
			closeImput(){
				this.imput.title = '',
				this.imput.description = '',
				this.imput.newToDo = false,
				this.imput.editToDo = false
			},

			async addImput(){
				this.list.push ({
					title: this.imput.title,
					description: this.imput.description
				})
				this.closeImput()
			},

			removeToDo(index) {
				this.list.splice(index, 1)
			},

			openEditImput(todo, index) {
				return(
					this.imput.title = todo.title,
					this.imput.description = todo.description,
					this.imput.index = todo.index,
					this.imput.id = todo.id,
					this.imput.open = true
				) 
			},

			editImput(this.list[index], name, description) {
				const {title, description, index} = this.imput
				this.imput[index] = {
					return  
						name,
						description
					
				}
				this.closeImput()
			}

		}
	}
</script>