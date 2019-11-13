# PackageFileParser
A program that parses software package information from /var/lib/dpkg/status -file in Debian and Ubuntu systems. The application parses package names, descriptions and dependency information from the file. Parsed information is displayed via HTML interface. The index page contains an alphabetical list of all software packages and their names function as links. Each link directs to view which displays more information about the package. All dependency and reverse dependency package names on this page function again as links. Implemented using Node.js, Express.js and hbs view engine.

Live application: https://sarja-package-file-parser.herokuapp.com/


