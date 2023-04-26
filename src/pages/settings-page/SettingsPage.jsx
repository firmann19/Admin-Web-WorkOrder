import React from 'react'

const SettingsPage = () => {
  return (
    <card>
      <h1>Settings</h1>
      <form className="container-settings">
        <h2>Change Name</h2>
          <div className='change-name'>
            <input type="text" name="fullname" placeholder="FullName" />
            <button>Ganti</button>
          </div>
      </form>
    </card>
  )
}

export default SettingsPage