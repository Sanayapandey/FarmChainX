"""
Script to create a test image for the Fruit Quality Analysis System.
"""
import os
import numpy as np
import cv2
from pathlib import Path

def create_test_image(output_path, size=(500, 500), color=(0, 165, 255), text=None):
    """
    Create a test image with a colored background and optional text.
    
    Args:
        output_path (str): Path to save the image
        size (tuple): Image dimensions (width, height)
        color (tuple): BGR color values (blue, green, red)
        text (str, optional): Text to add to the image
    """
    # Create a blank image with the specified color
    image = np.zeros((size[1], size[0], 3), dtype=np.uint8)
    image[:] = color
    
    # Add text if provided
    if text:
        font = cv2.FONT_HERSHEY_SIMPLEX
        text_size = cv2.getTextSize(text, font, 1, 2)[0]
        text_x = (size[0] - text_size[0]) // 2
        text_y = (size[1] + text_size[1]) // 2
        
        # Add a background for the text
        padding = 10
        cv2.rectangle(
            image,
            (text_x - padding, text_y - text_size[1] - padding),
            (text_x + text_size[0] + padding, text_y + padding),
            (255, 255, 255),
            -1
        )
        
        # Add the text
        cv2.putText(
            image,
            text,
            (text_x, text_y),
            font,
            1,
            (0, 0, 0),  # Black text
            2,
            cv2.LINE_AA
        )
    
    # Create the output directory if it doesn't exist
    output_dir = os.path.dirname(output_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    
    # Save the image
    cv2.imwrite(output_path, image)
    print(f"Test image saved to: {output_path}")

if __name__ == "__main__":
    # Create a test directory if it doesn't exist
    test_dir = "tests/test_data"
    os.makedirs(test_dir, exist_ok=True)
    
    # Create test images for different fruit types
    test_images = [
        ("apple.jpg", (0, 165, 255), "Apple"),      # Orange-red color for apple
        ("banana.jpg", (0, 255, 255), "Banana"),    # Yellow color for banana
        ("orange.jpg", (0, 165, 255), "Orange"),    # Orange color for orange
        ("mango.jpg", (0, 165, 255), "Mango"),      # Orange color for mango
        ("grapes.jpg", (100, 0, 200), "Grapes"),    # Purple color for grapes
        ("strawberry.jpg", (0, 0, 255), "Strawberry"),  # Red color for strawberry
    ]
    
    for filename, color, text in test_images:
        output_path = os.path.join(test_dir, filename)
        create_test_image(output_path, color=color, text=text)
