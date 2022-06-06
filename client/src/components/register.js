
export const Register = () => {
    return(
        <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-5" style={{paddingBottom: '30%', paddingTop: '10%'}}>
              <div className="card-body d-flex flex-column align-items-center">
                <form className="text-center" method="post">
                  <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Username" /></div>
                  <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" /></div>
                  <div className="mb-3"><button className="btn btn-dark d-block w-100" type="submit">Sign up</button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}