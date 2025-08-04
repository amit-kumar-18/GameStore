# ----------- Build Stage -----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Install Node.js & Angular CLI
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g @angular/cli

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Restore .NET dependencies
RUN dotnet restore

# Install Angular dependencies
WORKDIR /app/ClientApp
RUN npm install

# Go back to root and make prod script executable
WORKDIR /app
RUN chmod +x ./prod-build.sh

# Run production build (Angular + .NET publish)
RUN ./prod-build.sh

# ----------- Runtime Stage -----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copy published output
COPY --from=build /app/publish ./

# Expose port and set env
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "GameStore.Api.dll"]
