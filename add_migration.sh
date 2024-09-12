if [ -z "$1" ]; then
    echo "Please rovide a migration name."
    exit 1
fi

dotnet ef migrations add $1 -p Infrastructure -s API -c RentalContext -o Data/Migrations


#  chmod +x add_migration.sh
# Write ./add_migration.sh "InitialEntities" to create the migration
