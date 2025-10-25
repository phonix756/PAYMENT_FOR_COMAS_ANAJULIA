// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                // In a real application, you would validate credentials with a server
                // For this demo, we'll just redirect to the dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Please enter both username and password');
            }
        });
    }

    // Transfer Type Toggle
    const transferType = document.getElementById('transferType');
    const bankFields = document.getElementById('bankTransferFields');
    const cryptoFields = document.getElementById('cryptoTransferFields');

    if (transferType) {
        transferType.addEventListener('change', function() {
            if (this.value === 'bank') {
                bankFields.style.display = 'block';
                cryptoFields.style.display = 'none';
            } else {
                bankFields.style.display = 'none';
                cryptoFields.style.display = 'block';
            }
        });
    }

    // Transfer Key Modal
    const initiateTransferBtn = document.getElementById('initiateTransfer');
    const transferKeyModal = document.getElementById('transferKeyModal');
    const cancelTransferBtn = document.getElementById('cancelTransfer');
    const confirmTransferBtn = document.getElementById('confirmTransfer');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    if (initiateTransferBtn) {
        initiateTransferBtn.addEventListener('click', function() {
            const amount = document.getElementById('amount').value;
            if (!amount || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            
            transferKeyModal.classList.add('active');
        });
    }

    if (cancelTransferBtn) {
        cancelTransferBtn.addEventListener('click', function() {
            transferKeyModal.classList.remove('active');
        });
    }

    if (closeModalBtns) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                transferKeyModal.classList.remove('active');
                if (successModal) successModal.classList.remove('active');
            });
        });
    }

    // Success Modal
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    const successAmount = document.getElementById('successAmount');
    const successRecipient = document.getElementById('successRecipient');

    if (confirmTransferBtn) {
        confirmTransferBtn.addEventListener('click', function() {
            const transferKey = document.getElementById('transferKey').value;
            
            // Check if transfer key is correct (must be 654321)
            if (transferKey !== '654321') {
                alert('Invalid transfer key. Please enter the correct 6-digit code.');
                return;
            }
            
            // In a real application, you would verify the transfer key with the server
            // For this demo, we'll just show the success modal
            
            const amount = document.getElementById('amount').value;
            const transferTypeValue = document.getElementById('transferType').value;
            
            if (successAmount) successAmount.textContent = '$' + parseFloat(amount).toLocaleString(undefined, {minimumFractionDigits: 2});
            
            if (transferTypeValue === 'bank') {
                const recipient = document.getElementById('recipientName').value || 'Unknown Recipient';
                if (successRecipient) successRecipient.textContent = recipient;
            } else {
                const cryptoType = document.getElementById('cryptoType').value.toUpperCase();
                if (successRecipient) successRecipient.textContent = cryptoType + ' Wallet';
            }
            
            transferKeyModal.classList.remove('active');
            if (successModal) successModal.classList.add('active');
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            if (successModal) successModal.classList.remove('active');
            // Reset form
            const transferForm = document.getElementById('transferForm');
            if (transferForm) transferForm.reset();
        });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Check URL parameters for pre-filling transfer form
    const urlParams = new URLSearchParams(window.location.search);
    const transferTypeParam = urlParams.get('type');
    const assetParam = urlParams.get('asset');
    
    if (transferTypeParam === 'crypto' && document.getElementById('transferType')) {
        document.getElementById('transferType').value = 'crypto';
        document.getElementById('bankTransferFields').style.display = 'none';
        document.getElementById('cryptoTransferFields').style.display = 'block';
        
        if (assetParam && document.getElementById('cryptoType')) {
            document.getElementById('cryptoType').value = assetParam;
        }
    }
});
