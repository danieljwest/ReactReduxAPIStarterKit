import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap/lib/Modal'

/*
See bootstrap documentation (link below) for what are the options
http://react-bootstrap.github.io/components.html#modals-props
*/
export class ModalWindow extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func
  };

  render () {
    const enforceFocus = true
    return (
      <div>
        <Modal {...this.props} enforceFocus={enforceFocus} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ModalWindow
