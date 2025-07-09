import unittest
import requests
import time
import sys

class VirtualKeyboardTest(unittest.TestCase):
    """Test suite for Virtual Keyboard Pro application"""
    
    def setUp(self):
        """Set up test environment"""
        self.base_url = "http://localhost:8080"
        # Check if server is accessible
        try:
            response = requests.get(self.base_url, timeout=5)
            if response.status_code != 200:
                self.fail(f"Server not responding properly. Status code: {response.status_code}")
        except requests.RequestException as e:
            self.fail(f"Server not accessible: {str(e)}")
    
    def test_index_page(self):
        """Test if the index page loads correctly"""
        response = requests.get(self.base_url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("Virtual Keyboard Pro", response.text)
        self.assertIn("script.js", response.text)
        self.assertIn("styles.css", response.text)
    
    def test_script_js(self):
        """Test if script.js loads correctly"""
        response = requests.get(f"{self.base_url}/script.js")
        self.assertEqual(response.status_code, 200)
        self.assertIn("VirtualKeyboard", response.text)
    
    def test_styles_css(self):
        """Test if styles.css loads correctly"""
        response = requests.get(f"{self.base_url}/styles.css")
        self.assertEqual(response.status_code, 200)
        self.assertIn(".keyboard", response.text)

if __name__ == "__main__":
    unittest.main()