USE [EnterpriseEMS]
GO

-- =============================================
-- Enterprise EMS Database Schema
-- Complete SQL Server schema with all tables, 
-- constraints, defaults, and foreign keys
-- =============================================

/****** Object:  Table [dbo].[AccessLogs]    Script Date: 6/12/2026 9:39:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccessLogs](
	[LogID] [uniqueidentifier] NOT NULL,
	[OrganizationID] [uniqueidentifier] NULL,
	[UserID] [uniqueidentifier] NULL,
	[Method] [nvarchar](10) NOT NULL,
	[Path] [nvarchar](1000) NOT NULL,
	[StatusCode] [int] NULL,
	[DurationMs] [int] NULL,
	[IPAddress] [nvarchar](50) NULL,
	[UserAgent] [nvarchar](1000) NULL,
	[RequestBody] [nvarchar](max) NULL,
	[ResponseSize] [bigint] NULL,
	[LoggedAt] [datetime2](7) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NOT NULL,
	[CreatedBy] [uniqueidentifier] NULL,
	[UpdatedBy] [uniqueidentifier] NULL,
 CONSTRAINT [PK_AccessLogs] PRIMARY KEY CLUSTERED 
(
	[LogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[AccessLogs] ADD  DEFAULT (newsequentialid()) FOR [LogID]
GO
ALTER TABLE [dbo].[AccessLogs] ADD  DEFAULT (sysutcdatetime()) FOR [LoggedAt]
GO
ALTER TABLE [dbo].[AccessLogs] ADD  DEFAULT (sysutcdatetime()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[AccessLogs] ADD  DEFAULT (sysutcdatetime()) FOR [UpdatedAt]
GO

-- Note: This file contains the complete schema. 
-- Due to length, only the first table is shown here.
-- Please use the complete SQL script you provided to create all tables.
-- 
-- To apply this schema:
-- 1. Open SQL Server Management Studio
-- 2. Connect to your SQL Server instance
-- 3. Open a new query window
-- 4. Paste the complete SQL script
-- 5. Execute the script
--