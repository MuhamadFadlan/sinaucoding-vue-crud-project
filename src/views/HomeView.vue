<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
          <div class="card-header">
            Daftar pengguna
          </div>
          <router-link :to="{ name: 'create' }" class="btn btn-primary btn-sm rounded shadow mb-3 ">
            Buat pengguna
          </router-link>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">no</th>
                  <th scope="col">nama</th>
                  <th scope="col">email</th>
                  <th scope="col">gender</th>
                  <th scope="col">status</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in pengguna" v-bind:key="data.id">

                  <td>{{ index+1 }}</td>
                  <td>{{ data.name }}</td>
                  <td>{{ data.email }}</td>
                  <td>{{ data.gender }}</td>
                  <td>{{ data.status }}</td>
                  <td>
                    <div class="btn-group">
                        <button v-on:click="viewPengguna(data.id)" class="btn btn-sm btn-outline-info" data-bs-toggle="modal" data-bs-target="#viewModal">
                          View 
                        </button> 
                        <button v-on:click="updatepengguna(data.id)" class="btn btn-sm btn-outline-warning">
                          Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger" v-on:click="deletePengguna(data.id)" >
                          Delete
                        </button>
                    </div>
                  </td>
                </tr>
              </tbody>
          </table>
          <div class="my-5">
            <button v-on:click.prevent="gantiHalaman(prev_page_url)" class="btn btn-primary">Prev</button>
            <button v-on:click.prevent="gantiHalaman(next_page_url)" class="btn btn-primary">Next</button>
          </div>
      </div>
      </div>

      <div class="modal fade" id="viewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Detail Pengguna</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <table class="table table-striped">
                    <tbody>
                    <tr>
                        <td>ID</td>
                        <td>: {{  detailPengguna['id']  }}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>: {{  detailPengguna['name']  }}</td>
                    </tr>
                      <tr>
                        <td>Email</td>
                        <td>: {{  detailPengguna['email']  }}</td>
                    </tr>
                      <tr>
                        <td>Gender</td>
                        <td>: {{  detailPengguna['gender']  }}</td>
                    </tr>
                      <tr>
                        <td>Status</td>
                        <td>: {{  detailPengguna['status']  }}</td>
                    </tr>
                    </tbody>
                </table>
                <p class="fs-3">Daftar Post</p>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-success mb-3" >Buat Post</button>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios' 
  const url = 'https://gorest.co.in/public/v2/users/'
  const token = '7aa336f2b419e808fcca8ecaf5535696e098a2cf0d22befb3785bb0e30d345d7'      


  export default ({
      name:"pengguna",
      data() {
          return {
              pengguna: [],
                addPengguna :{
                  name:'',
                  email:'',
                  gender:'',
                  status:'',
              },
              
              detailPengguna: [],
          }
          
      },


      methods:{

      async viewPengguna(id){
           let resultView = await axios.get(url+id,{
                          headers: {
                          Authorization: `Bearer ${token}`,
                           },
               })
                  this.detailPengguna=resultView.data
      },


         async deletePengguna(id){
              let resultDelete = await axios.delete(url+id,{
                    headers: {
                          Authorization: `Bearer ${token}`,
                           },
              });
              if(resultDelete.status == 204){
                  this.loadData()
              }
          },


          async loadData(){
               let res = await axios.get(url,{
                          headers: {
                          Authorization: `Bearer ${token}`,
                           },
               })
                      this.pengguna=res.data
          },


       async tambahPengguna()
       {
              let resultTambah =  await axios.post(url,{
                  name: this.addPengguna.name,
                  email: this.addPengguna.email,
                  gender: this.addPengguna.gender,
                  status: this.addPengguna.status,
              },{
               headers: {
                  'Content-Type': 'application/json',
                   Authorization:`Bearer ${token}`,
               }
                  
              });
              if(resultTambah.status == 201){
                   this.$router.push({name:'home'})
              }
          },
          async updatepengguna(id){
            this.$router.push({name: 'update',query:{id:id}})
          }
      },



      
     async mounted()
      {
       this.loadData();
      }
          
      
  })
  </script>
