function Register(){
  return (
    <body className="login">
      <div className="container login">
        <div className="d-flex justify-content-center">
        <h1 className="webtitle">Create an account</h1>
        </div>
        <form>
          <div class="form-group login">
            <input type="text" class="form-control" placeholder="First Name" />
          </div>          
          <div class="form-group login">
            <input type="text" class="form-control" placeholder="Username" />
          </div>
          <div class="form-group login">
            <input type="email" class="form-control" placeholder="Email" />
          </div>
          <div class="form-group login">
            <input type="password" class="form-control" placeholder="Password" />
          </div>
          <div class="form-group login">
            <input type="password" class="form-control" placeholder="Confirm Password" />
          </div>
          <p className="register-sent"> Already have an account? <a href="#/login/*" className="register-link">Login now</a></p>
          <div className="d-flex justify-content-center">
            <button type="submit" class="btn-login">Sign Up</button>
          </div>
        </form>
      </div>  
    </body>
  )
}

export default Register