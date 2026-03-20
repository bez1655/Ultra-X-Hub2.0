#!/usr/bin/env python3
"""
HubXUltra React Native Expo App Testing Script
Tests TypeScript compilation, file structure, dependencies, and components
"""

import sys
import json
import os
import subprocess
from datetime import datetime
from pathlib import Path

class HubXUltraAppTester:
    def __init__(self):
        self.base_path = Path("/app")
        self.tests_run = 0
        self.tests_passed = 0
        self.issues = []

    def log_test(self, name, passed, message=""):
        """Log a test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ {name}: PASS {message}")
        else:
            self.issues.append({"test": name, "issue": message})
            print(f"❌ {name}: FAIL - {message}")

    def check_file_exists(self, file_path, description=""):
        """Check if a file exists"""
        path = self.base_path / file_path
        exists = path.exists()
        desc = description or f"File {file_path}"
        self.log_test(desc, exists, f"at {path}" if exists else f"missing at {path}")
        return exists

    def check_package_json(self):
        """Validate package.json dependencies and scripts"""
        print("\n🔍 Testing package.json configuration...")
        
        package_json_path = self.base_path / "package.json"
        if not package_json_path.exists():
            self.log_test("package.json exists", False, "File not found")
            return
        
        try:
            with open(package_json_path) as f:
                package_data = json.load(f)
            
            # Check required dependencies
            required_deps = [
                "@expo/vector-icons",
                "@react-native-async-storage/async-storage", 
                "expo",
                "expo-brightness",
                "expo-clipboard", 
                "expo-constants",
                "expo-linking",
                "expo-notifications",
                "expo-router",
                "expo-secure-store",
                "expo-status-bar",
                "lucide-react-native",
                "nativewind",
                "react",
                "react-native",
                "react-native-gesture-handler",
                "react-native-reanimated",
                "react-native-safe-area-context",
                "react-native-screens",
                "react-native-svg",
                "react-native-webview",
                "tailwindcss"
            ]
            
            dependencies = package_data.get("dependencies", {})
            dev_dependencies = package_data.get("devDependencies", {})
            all_deps = {**dependencies, **dev_dependencies}
            
            missing_deps = []
            for dep in required_deps:
                if dep not in all_deps:
                    missing_deps.append(dep)
            
            self.log_test(
                "All required dependencies present",
                len(missing_deps) == 0,
                f"Missing: {', '.join(missing_deps)}" if missing_deps else "All dependencies found"
            )
            
            # Check TypeScript dependency
            has_typescript = "typescript" in dev_dependencies
            self.log_test("TypeScript dependency", has_typescript, "Found" if has_typescript else "Missing")
            
            # Check scripts
            scripts = package_data.get("scripts", {})
            required_scripts = ["start", "android", "ios", "web"]
            missing_scripts = [s for s in required_scripts if s not in scripts]
            
            self.log_test(
                "Required scripts present",
                len(missing_scripts) == 0,
                f"Missing: {', '.join(missing_scripts)}" if missing_scripts else "All scripts found"
            )
            
        except json.JSONDecodeError as e:
            self.log_test("package.json valid JSON", False, f"Invalid JSON: {e}")
        except Exception as e:
            self.log_test("package.json parsing", False, f"Error: {e}")

    def check_app_json(self):
        """Validate app.json configuration for Android"""
        print("\n🔍 Testing app.json configuration...")
        
        app_json_path = self.base_path / "app.json"
        if not app_json_path.exists():
            self.log_test("app.json exists", False, "File not found")
            return
        
        try:
            with open(app_json_path) as f:
                app_data = json.load(f)
            
            expo_config = app_data.get("expo", {})
            
            # Check basic configuration
            required_fields = ["name", "slug", "version", "orientation"]
            missing_fields = [f for f in required_fields if f not in expo_config]
            
            self.log_test(
                "Basic app.json fields",
                len(missing_fields) == 0,
                f"Missing: {', '.join(missing_fields)}" if missing_fields else "All basic fields present"
            )
            
            # Check Android configuration
            android_config = expo_config.get("android", {})
            has_android_package = "package" in android_config
            has_android_permissions = "permissions" in android_config
            
            self.log_test("Android package configured", has_android_package)
            self.log_test("Android permissions configured", has_android_permissions)
            
            if has_android_permissions:
                permissions = android_config["permissions"]
                has_internet = "android.permission.INTERNET" in permissions
                self.log_test("Internet permission", has_internet)
            
            # Check plugins
            plugins = expo_config.get("plugins", [])
            has_expo_router = "expo-router" in plugins
            has_secure_store = "expo-secure-store" in plugins
            has_notifications = any("expo-notifications" in str(p) for p in plugins)
            
            self.log_test("expo-router plugin", has_expo_router)
            self.log_test("expo-secure-store plugin", has_secure_store)
            self.log_test("expo-notifications plugin", has_notifications)
            
        except json.JSONDecodeError as e:
            self.log_test("app.json valid JSON", False, f"Invalid JSON: {e}")
        except Exception as e:
            self.log_test("app.json parsing", False, f"Error: {e}")

    def check_typescript_config(self):
        """Validate TypeScript configuration"""
        print("\n🔍 Testing TypeScript configuration...")
        
        # Check tsconfig.json
        tsconfig_path = self.base_path / "tsconfig.json"
        if tsconfig_path.exists():
            try:
                with open(tsconfig_path) as f:
                    ts_config = json.load(f)
                
                extends = ts_config.get("extends")
                has_expo_base = extends == "expo/tsconfig.base"
                self.log_test("Extends expo/tsconfig.base", has_expo_base)
                
                compiler_options = ts_config.get("compilerOptions", {})
                has_strict = compiler_options.get("strict", False)
                has_paths = "paths" in compiler_options
                
                self.log_test("Strict mode enabled", has_strict)
                self.log_test("Path mapping configured", has_paths)
                
                include = ts_config.get("include", [])
                includes_tsx = any("**/*.tsx" in item for item in include)
                includes_expo_types = any(".expo/types" in item for item in include)
                
                self.log_test("Includes .tsx files", includes_tsx)
                self.log_test("Includes expo types", includes_expo_types)
                
            except Exception as e:
                self.log_test("tsconfig.json parsing", False, f"Error: {e}")
        else:
            self.log_test("tsconfig.json exists", False, "Missing file")

    def check_expo_router_structure(self):
        """Validate Expo Router file structure"""
        print("\n🔍 Testing Expo Router structure...")
        
        # Check root layout
        root_layout = self.check_file_exists("app/_layout.tsx", "Root layout file")
        
        # Check tabs layout
        tabs_layout = self.check_file_exists("app/(tabs)/_layout.tsx", "Tabs layout file")
        
        # Check tab screens
        tab_screens = [
            "app/(tabs)/index.tsx",
            "app/(tabs)/search.tsx", 
            "app/(tabs)/vr.tsx",
            "app/(tabs)/library.tsx"
        ]
        
        for screen in tab_screens:
            screen_name = Path(screen).stem
            self.check_file_exists(screen, f"Tab screen: {screen_name}")
        
        # Check stack screens
        stack_screens = [
            "app/pin.tsx",
            "app/vr-player/[id].tsx"
        ]
        
        for screen in stack_screens:
            screen_name = Path(screen).stem
            self.check_file_exists(screen, f"Stack screen: {screen_name}")

    def check_sites_constants(self):
        """Validate sites.ts constants file"""
        print("\n🔍 Testing sites.ts constants...")
        
        sites_path = self.base_path / "constants/sites.ts"
        if not sites_path.exists():
            self.log_test("sites.ts exists", False, "File not found")
            return
        
        try:
            with open(sites_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Count sites in the file
            site_count = content.count('{ id:')
            self.log_test(
                "84 sites present",
                site_count == 84,
                f"Found {site_count} sites, expected 84"
            )
            
            # Check required exports
            has_site_interface = "export interface Site" in content
            has_sites_array = "export const sites: Site[]" in content
            has_categories = "export const categories" in content
            has_category_colors = "export const categoryColors" in content
            
            self.log_test("Site interface exported", has_site_interface)
            self.log_test("Sites array exported", has_sites_array)
            self.log_test("Categories exported", has_categories)
            self.log_test("Category colors exported", has_category_colors)
            
            # Check VR sites
            vr_count = content.count('vr: true')
            self.log_test(
                "VR sites present",
                vr_count > 0,
                f"Found {vr_count} VR sites"
            )
            
        except Exception as e:
            self.log_test("sites.ts parsing", False, f"Error: {e}")

    def check_components(self):
        """Validate component files"""
        print("\n🔍 Testing component files...")
        
        # Check BrightnessControl component
        brightness_component = self.check_file_exists(
            "components/BrightnessControl.tsx", 
            "BrightnessControl component"
        )
        
        if brightness_component:
            try:
                with open(self.base_path / "components/BrightnessControl.tsx", 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check for expo-brightness usage
                has_brightness_import = "expo-brightness" in content
                has_gesture_handler = "PanGestureHandler" in content
                has_animation = "Animated" in content
                
                self.log_test("Uses expo-brightness", has_brightness_import)
                self.log_test("Uses gesture handler", has_gesture_handler)
                self.log_test("Uses animations", has_animation)
                
            except Exception as e:
                self.log_test("BrightnessControl parsing", False, f"Error: {e}")

    def check_grok_api_integration(self):
        """Validate Grok API integration in index.tsx"""
        print("\n🔍 Testing Grok API integration...")
        
        index_path = self.base_path / "app/(tabs)/index.tsx"
        if not index_path.exists():
            self.log_test("index.tsx exists for API check", False, "File not found")
            return
        
        try:
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check for Grok API key
            has_grok_key = "xai-FG3Jsy4bvCjsoVlmu85R0LgSGRGgoN0Q7SObmaoo5DLervVYlVPTXSxaQD80UVWKDdy2TilukGfRIJ5Q" in content
            self.log_test("Grok API key present", has_grok_key)
            
            # Check for API functions
            has_generate_ai = "generateAIDescription" in content
            has_send_advisor = "sendToAdvisor" in content
            has_api_fetch = "https://api.x.ai/v1/chat/completions" in content
            
            self.log_test("generateAIDescription function", has_generate_ai)
            self.log_test("sendToAdvisor function", has_send_advisor)
            self.log_test("Grok API endpoint", has_api_fetch)
            
        except Exception as e:
            self.log_test("Grok API integration check", False, f"Error: {e}")

    def check_pin_screen_secure_store(self):
        """Validate PIN screen with SecureStore"""
        print("\n🔍 Testing PIN screen with SecureStore...")
        
        pin_path = self.base_path / "app/pin.tsx"
        if not pin_path.exists():
            self.log_test("pin.tsx exists", False, "File not found")
            return
        
        try:
            with open(pin_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check SecureStore usage
            has_secure_store_import = "expo-secure-store" in content
            has_get_item = "getItemAsync" in content
            has_set_item = "setItemAsync" in content
            has_delete_item = "deleteItemAsync" in content
            
            self.log_test("SecureStore imported", has_secure_store_import)
            self.log_test("SecureStore getItem", has_get_item)
            self.log_test("SecureStore setItem", has_set_item)
            self.log_test("SecureStore deleteItem", has_delete_item)
            
        except Exception as e:
            self.log_test("PIN screen SecureStore check", False, f"Error: {e}")

    def attempt_typescript_compilation(self):
        """Attempt TypeScript compilation check"""
        print("\n🔍 Testing TypeScript compilation...")
        
        try:
            # Change to app directory
            os.chdir(self.base_path)
            
            # Try to check TypeScript compilation using tsc --noEmit
            result = subprocess.run(
                ["npx", "tsc", "--noEmit"],
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode == 0:
                self.log_test("TypeScript compilation", True, "No compilation errors")
            else:
                error_lines = result.stderr.strip().split('\n')
                # Show only first few errors to avoid clutter
                error_summary = '\n'.join(error_lines[:5])
                self.log_test("TypeScript compilation", False, f"Compilation errors:\n{error_summary}")
                
        except subprocess.TimeoutExpired:
            self.log_test("TypeScript compilation", False, "Compilation check timed out")
        except FileNotFoundError:
            self.log_test("TypeScript compilation", False, "TypeScript compiler not found (npx tsc)")
        except Exception as e:
            self.log_test("TypeScript compilation", False, f"Error running tsc: {e}")

    def check_required_assets(self):
        """Check for required asset files"""
        print("\n🔍 Testing required assets...")
        
        required_assets = [
            "assets/icon.png",
            "assets/splash.png", 
            "assets/adaptive-icon.png",
            "assets/favicon.png",
            "assets/notification-icon.png"
        ]
        
        for asset in required_assets:
            asset_name = Path(asset).name
            self.check_file_exists(asset, f"Asset: {asset_name}")

    def check_configuration_files(self):
        """Check configuration files"""
        print("\n🔍 Testing configuration files...")
        
        config_files = [
            ("babel.config.js", "Babel configuration"),
            ("metro.config.js", "Metro bundler configuration"),  
            ("tailwind.config.js", "Tailwind CSS configuration"),
            ("global.css", "Global CSS file"),
            ("nativewind-env.d.ts", "NativeWind types"),
            ("expo-env.d.ts", "Expo types")
        ]
        
        for file_path, description in config_files:
            self.check_file_exists(file_path, description)

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting HubXUltra React Native Expo App Testing...")
        print(f"🕒 Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # File structure tests
        self.check_package_json()
        self.check_app_json()
        self.check_typescript_config()
        self.check_expo_router_structure()
        self.check_sites_constants()
        self.check_components()
        self.check_grok_api_integration()
        self.check_pin_screen_secure_store()
        self.check_required_assets()
        self.check_configuration_files()
        
        # TypeScript compilation test
        self.attempt_typescript_compilation()
        
        # Summary
        print(f"\n📊 Test Summary:")
        print(f"   Tests run: {self.tests_run}")
        print(f"   Tests passed: {self.tests_passed}")
        print(f"   Tests failed: {self.tests_run - self.tests_passed}")
        print(f"   Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.issues:
            print("\n❌ Issues found:")
            for i, issue in enumerate(self.issues, 1):
                print(f"   {i}. {issue['test']}: {issue['issue']}")
        
        return len(self.issues) == 0

def main():
    """Main test runner"""
    tester = HubXUltraAppTester()
    success = tester.run_all_tests()
    
    print(f"\n🏁 Testing complete: {'✅ SUCCESS' if success else '❌ ISSUES FOUND'}")
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())