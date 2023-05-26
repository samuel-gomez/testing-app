import React from 'react'
import * as PropTypes from 'prop-types'
import './Input.css'

const Input = ({id, label, icon, ...inputProps}) => (
  <div className="Input input-field">
    {icon && <i className="material-icons prefix">{icon}</i>}
    <input id={id} type="text" {...inputProps} />
    <label htmlFor={id}>{label}</label>
  </div>
)

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
}

export default Input
