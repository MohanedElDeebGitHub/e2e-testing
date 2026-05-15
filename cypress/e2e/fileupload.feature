Feature: File Upload E2E Tests

  Scenario: FU01 - should upload single file
    Given I visit the file upload contact page
    When I upload file1.docx
    Then the file should be uploaded successfully

  Scenario: FU02 - should upload multiple files
    Given I visit the file upload contact page
    When I upload file1.docx and file2.txt
    Then the files should be uploaded successfully

  Scenario: FU03 - should upload text file
    Given I visit the file upload contact page
    When I upload file2.txt
    Then the file should be uploaded successfully
