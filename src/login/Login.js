function Login() {
  return (
    <body className="login">
      <div className="container login">
        <div className="d-flex justify-content-center">
        <h1 className="webtitle">Movie Website</h1>
        </div>
        <form>      
          <div class="form-group login">
            <input type="text" class="form-control" placeholder="Username" />
          </div>
          <div class="form-group login">
            <input type="password" class="form-control" placeholder="Password" />
          </div>
          <p className="register-sent"> Don't have an account? <a href="#/register/*" className="register-link">Sign up</a></p>
          <div className="d-flex justify-content-center">
            <button type="submit" class="btn-login">Login</button>
          </div>
        </form>
      </div>  
    </body>
  )
}

export default Login;