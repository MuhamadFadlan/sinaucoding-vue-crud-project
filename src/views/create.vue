<template>
  <div class="container">
    <div class="row">
          <router-link :to="{ name: 'home' }" class="btn btn-primary mb-3">
            Back
          </router-link>
      <div class="modal-body">
          <div class="col-md-16">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="addPengguna.name">
          </div>
           <div class="col-md-16">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" v-model="addPengguna.email">
          </div>
           <div class="col-md-16">
              <label for="gender" class="form-label">Gender</label>
              <input type="text" class="form-control" id="gender" v-model="addPengguna.gender">
          </div>
           <div class="col-md-16">
              <label for="status" class="form-label">Status</label>
              <input type="text" class="form-control" id="status" v-model="addPengguna.status">
          </div>
        </div>
        <div>
          <label for="status" class="form-label">
            .
          </label>
        </div>
        <div class="d-flex justify-content-end">
          <button v-on:click="tambahPengguna" class="btn btn-primary mb-3">Simpan</button><br>
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
            }
        },
  
  
        
       async mounted()
        {
         this.loadData();
        }
            
        
    })
    </script>