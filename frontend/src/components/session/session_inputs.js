

const SessionInput = props => (
    <div className='session-form-input'>
        <label>
          {props.title}:
          <input

            type={props.type}
            value={props.value}
            onChange={props.onChange}
            className="signup-input"
          />
        </label>
    </div>
)

export default SessionInput;