//this is a custom api response like if we have to return response we just need pass in that



class ApiResponse {
    constructor(statuscode , data , message  = "success"){
      this.statuscode = statuscode
      this.data = data
      this.message = message
    }
}

export {ApiResponse}