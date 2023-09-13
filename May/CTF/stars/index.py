import cv2
import numpy as np

# Load the image
img = cv2.imread('constellation.png')

# Convert the image to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold the image to create a binary image
_, thresh = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY)

# Find contours in the binary image
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Draw the contours on the original image (for visualization)
cv2.drawContours(img, contours, -1, (0, 255, 0), 2)

# Print the number of contours (which is equal to the number of stars)
num_stars = len(contours)
print("Number of celestial objects: {}".format(num_stars))

# Check if the number of stars is above a certain threshold and print a message with a flag
if num_stars > 10:
    print("Congratulations! You have found a new constellation and earned a flag!")
else:
    print("Sorry, not enough celestial objects found.")

# Display the original image with contours drawn
cv2.imshow('Image with contours', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
