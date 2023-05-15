-- Enum for Role
CREATE TYPE Role AS ENUM ('Manager', 'Coach', 'Player', 'Other');

-- Enum for LineupRole
CREATE TYPE LineupRole AS ENUM ('Player', 'Coach');

-- Enum for Invitation Status
CREATE TYPE InvitationStatus AS ENUM ('Pending', 'Accepted', 'Declined');

-- Users table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    FullName VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    PasswordHash VARCHAR(255),
    WalletAddress VARCHAR(255)
);

-- Squads table
CREATE TABLE Squads (
    SquadID SERIAL PRIMARY KEY,
    SquadName VARCHAR(255) NOT NULL,
    Description TEXT,
    CreatedAt TIMESTAMP NOT NULL,
    CreatedBy INT,
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);

-- Lineups table
CREATE TABLE Lineups (
    LineupID SERIAL PRIMARY KEY,
    LineupName VARCHAR(255) NOT NULL,
    SquadID INT,
    GameID INT,
    CreatedAt TIMESTAMP NOT NULL,
    CreatedBy INT,
    FOREIGN KEY (SquadID) REFERENCES Squads(SquadID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);

-- UserSquads table
CREATE TABLE UserSquads (
    UserSquadID SERIAL PRIMARY KEY,
    UserID INT,
    SquadID INT,
    Role Role NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (SquadID) REFERENCES Squads(SquadID)
);

-- UserLineups table
CREATE TABLE UserLineups (
    UserLineupID SERIAL PRIMARY KEY,
    UserID INT,
    LineupID INT,
    Role LineupRole NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (LineupID) REFERENCES Lineups(LineupID)
);

-- Games table
CREATE TABLE Games (
    GameID SERIAL PRIMARY KEY,
    GameName VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Invitations table
CREATE TABLE Invitations (
    InvitationID SERIAL PRIMARY KEY,
    SquadID INT,
    InvitedBy INT,
    Email VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL,
    Status InvitationStatus,
    FOREIGN KEY (SquadID) REFERENCES Squads(SquadID),
    FOREIGN KEY (InvitedBy) REFERENCES Users(UserID)
);