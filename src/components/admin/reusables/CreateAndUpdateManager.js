import React, { Fragment, useState, useEffect } from 'react';
import Proptypes from 'prop-types';

import Spinner from '../../reusables/Spinner';
import JustModal from './JustMoadal';
import Button from '../../reusables/Button';

function CreateAndUpdateManager({
  children, createAndUpdateAction, payloadData,
  fetching, actionType,
  isModal, openModalElement, modalTitle,
  onModalClose, status, successClose,
  errorClose, modalOpenText, onActionResponse,
  onActionError, lineButton = false,
}) {
  const [modalState, setModalState] = useState('close');

  useEffect(() => {
    if (onModalClose) onModalClose(modalState === 'close');
  }, [modalState])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (createAndUpdateAction) createAndUpdateAction(payloadData, actionType)
      .then(data => onActionResponse && onActionResponse(data))
      .catch(error => onActionError && onActionError(error));
  };

  console.log('render');

  if (isModal) return (
    <Fragment>
      { fetching && <Spinner fullScrren /> }
      <JustModal
        lineButton={lineButton}
        modalTitle={modalTitle}
        buttonText={modalOpenText}
        openComponent={openModalElement || null}
        onClose={(bol, mstate) => setModalState(mstate)}
        close={
          successClose && status === 'success' ? true :
          errorClose && status === 'error' ? true : false
        }
        childElement={
          <children.type
            {...children.props}
            onSubmit={handleSubmit}
          />
        }
      />
    </Fragment>
  )

  return (
    <Fragment>
      { fetching && <Spinner fullScrren /> }
      <children.type
        {...children.props}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}

export default CreateAndUpdateManager;

CreateAndUpdateManager.propTypes = {
  form: Proptypes.node.isRequired,
  createAndUpdateAction: Proptypes.func.isRequired,
  formProps: Proptypes.object,
  fetching: Proptypes.bool,
  actionType: Proptypes.oneOf(['create', 'update']),
  autoResetFromClose: Proptypes.bool,
};

CreateAndUpdateManager.defaultProps = {
  createAndUpdateAction: null,
  formProps: null,
  fetching: false,
  actionType: 'create',
  autoResetFromClose: true,
};
