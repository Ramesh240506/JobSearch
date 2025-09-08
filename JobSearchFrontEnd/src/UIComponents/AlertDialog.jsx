import * as React from 'react';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true); // popup shows immediately

  const handleYes = () => {
    alert('You clicked Yes!');
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (!open) return null; // hide popup when closed

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px 40px',
          borderRadius: '12px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ marginBottom: '15px' }}>Are you sure?</h2>
        <p style={{ marginBottom: '25px', color: '#555' }}>
          Do you want to proceed with this action?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            onClick={handleYes}
            style={{
              padding: '10px 25px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            Yes
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: '10px 25px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#f44336',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
