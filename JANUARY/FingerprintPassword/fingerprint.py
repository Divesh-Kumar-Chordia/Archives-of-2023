import hashlib
from pyfingerprint.pyfingerprint import PyFingerprint

# Connect to the fingerprint scanner
f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

# Wait for a finger to be placed on the scanner
print('Waiting for finger...')
while ( f.readImage() == False ):
    pass

# Convert the fingerprint image to a hash
image = f.getImage()
fingerprint_hash = hashlib.sha256(image).hexdigest()
print(fingerprint_hash)
;;;;;