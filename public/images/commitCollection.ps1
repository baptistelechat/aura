# Script pour découper un commit en plusieurs commits basés sur les sous-dossiers
$baseDir = "C:\path\to\folder"
$subFolders = @(
  "african", "camouflage", "candy", "cloud", "cocktails", "coffee",
  "doodle", "feminine", "fire", "flower", "fruit", "heart", "japanese",
  "jungle", "pirate", "skull", "spring", "watercolor"
)

# Commencer à créer des commits pour chaque sous-dossier
foreach ($folder in $subFolders) {
  $folderPath = "$baseDir\$folder"

  # Vérifier si le dossier existe avant d'ajouter
  if (Test-Path $folderPath) {
    # Ajouter le sous-dossier
    git add $folderPath
        
    # Créer le message de commit avec une majuscule au début du nom du dossier
    $folderCapitalized = $folder.Substring(0, 1).ToUpper() + $folder.Substring(1)
    $commitMessage = "✨ ($folderCapitalized) - Add $folderCapitalized images collection"
        
    # Exécuter le commit
    git commit -m $commitMessage
    # git push
  }
  else {
    Write-Host "Le dossier $folderPath n'existe pas. Skipping..."
  }
}
